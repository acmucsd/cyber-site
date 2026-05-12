---
published: 2026-05-07
title: On the Canvas hack
description: Our interpretation of the May 2026 Canvas hack
---

![A screenshot of the defaced Canvas login page. The text reads: "SHINYHUNTERS rooting your systems since '19 ;) ShinyHunters has breached Instructure (again). Instead of contacting us to resolve it they ignored us and applied some "security patches".](/blog/canvas-ransom.png)

Instructure's LMS [Canvas has been compromised](https://www.cnn.com/2026/05/07/us/canvas-hack-strands-college-students-finals-week), leading to an extended outage. We discuss

- How to react as a student
- Which schools are affected
- A theory about how it happened

---

## I'm a student, how does this affect me?

Your instructors should be willing to work with you to accomodate for disruption to your studies. You were not responsible for this incident and they were also unable to access Canvas.

### Do I need to change my password?

It couldn't hurt. The attackers could have inserted malicious phishing code on the frontend to steal your credentials if you typed them in.

[Authentication to Canvas](https://community.instructure.com/en/kb/articles/661431-how-do-i-configure-sso-settings-for-my-authentication-provider) usually happens on campus servers and not on Instructure's platform, so passwords are not believed to be at risk. You typically login to your school's single sign-on (SSO) service. Then you're redirected to Canvas on (compromised) Instructure servers.

### What happens next?

Anticipate an increase in phishing and targeted scams that make use of the leaked information. Attackers might craft convincing emails relating to classes you are taking e.g. extra credit opportunities, grades, etc. LLMs will greatly improve the ease and scale of these attacks.

---

## What data may have been compromised?

- Names of students and instructors
- Email addresses
- Student IDs
- Course enrollment information
- Content on Canvas such as messages

If you have submitted sensitive information to Canvas, make preparations for the information becoming public. The attackers gave a May 12, 2026 deadline before the data is leaked.

### Did Instructure pay the ransom?

This [Reddit thread](https://www.reddit.com/r/canvas/comments/1taj9of/instructure_has_reached_an_agreement_with_the/?utm_source=share&utm_medium=web3x&utm_name=web3xcss&utm_term=1&utm_content=share_button) claims that Instructure "reached an agreement with the unauthorized actor". There was no mention of a ransom or amount paid.

## Who is affected?

The attackers named over 8,000 institutions in a [text file](https://github.com/acmucsd/canvas-breach/blob/main/note.txt). You can search through it below. (check [here](https://acmucsd.github.io/canvas-breach/) if it doesn't load).

<iframe src="https://acmucsd.github.io/canvas-breach/" title="Search affected institutions" style="width:100%;height:480px;border:1px solid #ddd;border-radius:6px;" loading="lazy"></iframe>

---

## Who is behind the attack?

The [ransom message](https://acmucsd.github.io/canvas-breach/msg.html) (cleaned for malware) attributes the attack to the [ShinyHunters](https://en.wikipedia.org/wiki/ShinyHunters) black-hat group. The IP address provided, `91.215.85.103`, [belongs to](https://bgp.tools/prefix/91.215.85.0/24) a Russian hosting provider known for ignoring requests to take down malware and phishing. The web server also hosts past leaks by ShinyHunters.

The attackers' site on the dark web appeared to link to the downloadable leaks hosted on the normal web. It expresses that targeted organizations must pay the ransom or face disclosure of the data to other cybercriminal groups.

---

## How did the breach occur?

The specifics remain undisclosed, but [an article](https://businessinsights.bitdefender.com/technical-advisory-shinyhunters-breach-instructure-canvas-lms) by Sean Nikkel of BitDefender lays out two likely techniques:

- Vishing and social engineering to gain priveleged credentials and access (typical ShinyHunters M.O.)
- Privelege escalation through the Free-For-Teacher system and compromise due to improper isolation of Canvas instances

### What Instructure has said

[According to Instructure's CEO](https://www.instructure.com/incident_update), the exploit was via "support tickets in our Free for Teacher environment". Free for Teacher is Canvas's program allowing anyone to create their own Canvas instance for free.

Instructure has released a [changelog](https://community.instructure.com/en/discussion/666044/incident-change-log-for-may-2026) of UX updates in response to the incident. Here's a quick summary.

Changes made before the May 7 defacement:

- Better enforce external SSO before taking admin actions e.g. [themes](https://community.instructure.com/en/kb/articles/661411-how-do-i-upload-custom-javascript-and-css-files-to-an-account), [CSP](https://community.instructure.com/en/kb/articles/661603-how-do-i-manage-the-content-security-policy-for-an-account)
- Stop GraphQL clients from reading all enrollment IDs in a course
- Improve sanitization of inputs in Canvas's built in rich text editor

After May 7:

- Reenable HTML input in the rich text editor
- Disable account self-registration
- Gate third party apps' [developer key](https://developerdocs.instructure.com/services/canvas/oauth2/file.developer_keys) management behind SSO
- Disallow the use of client-side JavaScript to accept OAuth permissions
- Discourage bypassing browser-based authentication by restricting out-of-band redirect URLs
- Stop showing API secrets on the frontend but allow them to be rotated more easily

The changes having to do with HTML sanitization, CSP, and JavaScript seem to imply [XSS](https://en.wikipedia.org/wiki/Cross-site_scripting). This allows attackers to inject malicious JS into browser sessions. OAuth and third-party Canvas API clients are another common theme. Of note,

- By default, developer keys are unscoped and match the permissions of the issuing account
- Instructure employees can configure developer keys on customer instances

> ### One possible series of events
>
> 1. Attackers notice improper sanitization of support tickets and submit tickets containing malicious JS
> 2. Instructure support staff view the tickets and run malicious JavaScript, allowing the attackers to hijack their sessions
> 3. To persist their access, attackers use Instructure staff's sessions to create or steal developer keys with full access to all Canvas instances
> 4. Attackers use these keys to exfiltrate data using GraphQL, which allows batching massive queries with fewer requests
> 5. After Instructure fails to patch the XSS issue, attackers use Theme Editor to post their ransom note across different campuses (discussed further below)

This seems to hit the major points discussed in the changelog, but because those changes are described as "precautionary", it's possible that not all were directly relevant to the attack.

Confusingly, the changelog itself was updated.

```diff
- A new Root Account setting has been added to designate an "Elevated Auth Provider." When enabled, a user attempting to make admin actions must be authenticated through the selected auth provider, or the request will fail.
+ A setting designates an Elevated Auth Provider for Instructure employees. When enabled, Instructure’s actions require the user to be authenticated through the selected provider. Requests from users authenticated through any other provider will fail.
```

The changelog also frequently states "This change impacts Instructure employees. The setting is configured by Instructure engineers and is not currently available to Canvas administrators.", implying that Instructure employees' administrative permissions could have been abused in the attack.

### What we saw on Thursday

On May 7 at around 13:00 PST, UCSD's Canvas page was defaced. The attackers' message was included in a [CSS file](https://github.com/acmucsd/canvas-breach/blob/main/canvas-override.css). It seems to have been inserted through Theme Editor. Because the mobile clients don't apply custom styles, they functioned until Instructure shut down the service for "scheduled maintenance".

Instructure's response page says "the same issue that led to the unauthorized access the prior week". This leads us to believe that Canvas's initial response involved revoking malicious API keys but overlooked the original support tickets issue.

---

## What are people saying?

Our alumnus Gowtham has posted some [thoughts here](https://www.linkedin.com/posts/gowthamduggirala_bug-bounties-and-vulnerability-disclosure-activity-7458335816629555200-1SF2). Other users report discovering [vulnerabilities](https://www.reddit.com/r/cybersecurity/comments/1t6wmkw/reported_a_broken_access_control_bug_to/) in Canvas before the breach.
