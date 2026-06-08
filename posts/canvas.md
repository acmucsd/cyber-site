---
published: 2026-05-07
title: On the Canvas hack
description: Our interpretation of the May 2026 Canvas hack
---

![A screenshot of the defaced Canvas login page. The text reads: "SHINYHUNTERS rooting your systems since '19 ;) ShinyHunters has breached Instructure (again). Instead of contacting us to resolve it they ignored us and applied some "security patches".](/blog/canvas-ransom.png)

Instructure's LMS [Canvas has been compromised](https://www.cnn.com/2026/05/07/us/canvas-hack-strands-college-students-finals-week), leading to an extended outage. This post discusses the implications for students, lists out the institutions named, and discusses a technical attack vector.

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

### Did Instructure pay the ransom?

Yes, according to a [webinar summary document](https://www.instructure.com/sites/default/files/pdf/Instructure_Webinar_Questions_Privileged_Confidential_5.15.26.pdf) that has been released.

## Who is affected?

The attackers named over 8,000 institutions in a [text file](https://github.com/acmucsd/canvas-breach/blob/main/raw/instructure_affected_schools_list.txt). You can search through it below. (check [here](https://acmucsd.github.io/canvas-breach/) if it doesn't load).

<iframe src="https://acmucsd.github.io/canvas-breach/" title="Search affected institutions" style="width:100%;height:480px;border:1px solid #ddd;border-radius:6px;" loading="lazy"></iframe>

---

## Who is behind the attack?

The [ransom message](https://acmucsd.github.io/canvas-breach/msg.html) (cleaned for malware) attributes the attack to the [ShinyHunters](https://en.wikipedia.org/wiki/ShinyHunters) black-hat group. The IP address provided, `91.215.85.103`, [belongs to](https://bgp.tools/prefix/91.215.85.0/24) a Russian hosting provider called [Prospero](https://krebsonsecurity.com/2025/02/notorious-malware-spam-host-prospero-moves-to-kaspersky-lab/), which is a "bulletproof" host that ignores takedown requests. The web server also hosts past leaks by ShinyHunters.

The attackers' site on the dark web appeared to link to the downloadable leaks hosted on the normal web. It expresses that targeted organizations must pay the ransom or face disclosure of the data to other cybercriminal groups.

---

## How did the breach occur?

### Late April
Based on the webinar summary linked above and this [changelog](https://community.instructure.com/en/discussion/666044/incident-change-log-for-may-2026), the attackers used a cross-site scripting (XSS) vulnerability within the Free-for-Teacher product's support tickets system. Instructure employees' browsers, upon viewing the tickets, ran arbitrary code that stole priveleged credentials and allowed the attackers to access multiple Canvas instances. They then exfiltrated data, perhaps using the GraphQL API.

In the changelog, Instructure restricted the GraphQL API's ability to access enrollment information after the initial breach but before May 7's defacement. They also increased restrictions on employee accounts by gating more actions behind SSO.

### May 7
This time, the attackers used a second XSS vulnerability within the discussions system. The XSS payload, when viewed, authorized a malicious [OAuth token](https://developerdocs.instructure.com/services/canvas/oauth2/file.oauth) to bypass the restrictions on employee accounts.

The defacement was carried out using the Canvas theme editor. This became apparent to us after one of our community members identified that the message was included as a stylesheet. The mobile clients, which don't render custom themes, remained functional until Canvas itself was taken down by Instructure. The OAuth tokens themselves don't appear to provide access to the theme editor through the API, but they could have moved laterally towards theme editing from the tokens.

After this incident, Instructure implemented a series of patches relating to third-party integrations such as enforcing manual browser OAuth authentication and further restricting key management. Likely in response to the series of XSS vulnerabilities, they also locked down Canvas's built-in text editor.

---

## What are we learning from this?

### Bug reports
Our alumnus Gowtham has posted some [thoughts here](https://www.linkedin.com/posts/gowthamduggirala_bug-bounties-and-vulnerability-disclosure-activity-7458335816629555200-1SF2) about bug reports. Other users, such as one on Reddit, report discovering [vulnerabilities](https://www.reddit.com/r/cybersecurity/comments/1t6wmkw/reported_a_broken_access_control_bug_to/) in Canvas before the breach, which appeared not to have been taken seriously.

### Principle of least privelege
No employee or user should have more access than they need to carry out their duties. It's always a smart idea to restrict destructive actions behind verification such as multi-factor authentication, as Instructure implemented after the attack.

A support agent deciding to access or modify the information of every customer at once is a rare event and the type of action that should be blocked by default. Had more restrictions been placed on support accounts, the scale of the attack would have been limited.

### Times are changing
Cross-site scripting attacks were prevalent in the early Internet; Samy Kamkar's MySpace worm comes to mind as a classic example. As sanitization improved and vulnerabilities were patched out of more systems, attackers such as ShinyHunters tended to use social engineering to carry out their attacks by fooling unwitting humans with access to critical infrastructure.

In 2026, many major vulnerabilities and attacks were against open source software, such as a string of Linux privelege escalation bugs and supply chain attacks on popular open source tools. One such bug, CopyFail, was discovered by an AI tool. 

Canvas is open source as well, and although we are not saying that LLMs were used in this attack, their use in vulnerability discovery represents a concerning trend. We may be seeing a time where technical vulnerabilities are more pervasive than ever before and increasingly abused as a result. Breaches such as this one with more complex attack vectors could increase in frequency.

### Final thoughts
Every quarter, students learn about and ethically implement XSS as part of CSE 127, UCSD's undergrad computer security class. If you took CSE 127, you've already done a less-complicated version of what happened here!

Although unfortunate, it was an educational experience for us to come together and discuss this real-world incident as it occured. If you found this interesting, we'd love to see you in our members-first community of cyber learners and enthusiasts.
