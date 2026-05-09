---
published: 2026-05-07
title: On the Canvas hack
description: A list of schools affected by the May 2026 Canvas hack
---

Instructure's LMS [Canvas has been compromised](https://www.cnn.com/2026/05/07/us/canvas-hack-strands-college-students-finals-week), leading to an extended outage. In this blog post we discuss what to do as a student, who has been affected, and our observations of the incident.

---

## I'm a student, how does this affect me?

Your instructors should be willing to work with you to accomodate for disruption to your studies. You were not responsible for this incident and they were also unable to access Canvas.

### Do I need to change my password?
Authentication to Canvas usually happens on campus servers and not on Instructure's platform, so passwords are not believed to be at risk. However, it couldn't hurt to change your password as the attackers could have inserted malicious phishing code on the frontend.

The University of California has restricted access to Canvas and revoked logged-in sessions. Active sessions could remain at risk and they have advised users to avoid accessing Canvas until they determine Canvas to be secure.

### What happens next?
Anticipate an increase in phishing and targeted scams that make use of the leaked information. Extra viligance must be exercised online.

---

## What data may have been compromised?

- Names of students and instructors
- .edu emails
- Student IDs
- Content on Canvas such as messages, assignments, comments

If you have submitted sensitive information to Canvas, make preparations for the information becoming public. The attackers gave a May 12, 2026 deadline before the data is leaked.

---

## Who is affected?

Search the institutions mentioned by the attackers below. (check [here](https://acmucsd.github.io/canvas-breach/) if it doesn't load). Note that this list may not match the actually affected institutions.

<iframe src="https://acmucsd.github.io/canvas-breach/" title="Search affected institutions" style="width:100%;height:480px;border:1px solid #ddd;border-radius:6px;" loading="lazy"></iframe>

---

## Who is behind the attack?
The [ransom message](https://acmucsd.github.io/canvas-breach/msg.html) (cleaned for malware) attributes the attack to the [ShinyHunters](https://en.wikipedia.org/wiki/ShinyHunters) black-hat group. The IP address provided, `91.215.85.103`, [belongs to](https://bgp.tools/prefix/91.215.85.0/24) a Russian hosting provider known for ignoring requests to take down malware and phishing. The web server also hosts past leaks by ShinyHunters.

The attackers' site on the dark web appeared to link to the downloadable leaks hosted on the normal web.

---

## How did the breach occur?

[According to Instructure](https://www.instructure.com/incident_update), the attackers utilized an exploit relating to Canvas Free-For-Teacher accounts, both to initially exfiltrate data and later to deface frontend webpages. The specifics remain undisclosed, but [an article](https://businessinsights.bitdefender.com/technical-advisory-shinyhunters-breach-instructure-canvas-lms) by Sean Nikkel of BitDefender lays out two likely techniques:
- Vishing and social engineering to gain priveleged credentials and access. This has been used extensively by ShinyHunters.
- Privelege escalation through the Free-For-Teacher system and compromise due to improper isolation of Canvas instances. It is suspected that third-party integrations may have been involved in the attack vector.

### May 7 denial of service

On May 7 at around 13:00 PST, UCSD's Canvas page was defaced. The attackers' message was included in a [CSS file](https://github.com/acmucsd/canvas-breach/blob/main/canvas-override.css). It seems to have been inserted as a [custom style](https://community.instructure.com/en/kb/articles/661411-how-do-i-upload-custom-javascript-and-css-files-to-an-account), normally used for customization by schools.

If so, this implies that the attackers gained access to the configurations of the affected instances and were able to apply the changes en masse. Interestingly, Canvas's backend remained functional via the mobile clients until the platform was taken down for "scheduled maintenance" by Instructure.

The stylesheet was located at this now-dead URL, and it wouldn't be a surprise if this account and file corresponded to to a Free-For-Teacher instance.
```
https://instructure-uploads.s3.amazonaws.com/account_131710000000000001/attachments/18218585/canvas-override.css
```

Our alumnus Gowtham has posted some [thoughts here](https://www.linkedin.com/posts/gowthamduggirala_bug-bounties-and-vulnerability-disclosure-activity-7458335816629555200-1SF2). Other users report discovering [vulnerabilities](https://www.reddit.com/r/cybersecurity/comments/1t6wmkw/reported_a_broken_access_control_bug_to/) in Canvas before the breach.

