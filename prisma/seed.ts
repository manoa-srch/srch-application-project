import { Prisma, Role } from '@prisma/client';
import * as config from '../config/settings.development.json';
import { prisma } from '../src/lib/prisma';
import { hash } from 'bcryptjs';

const srchContent: Prisma.SRCHContentCreateInput[] = [
  {
    title: '1.a: What is Privacy?',
    summary:
      'Introduces privacy as control over personal information, context, and boundaries.',
    body: `Here we present some of the answers different thinkers and disciplines give to the question, "What is privacy about?" We do not aim to comprehensively survey theories or take sides in the many debates happening around this topic in philosophy, psychology, anthropology, and other disciplines. Rather, we offer several lenses through which to understand privacy and what it delineates. The goal is to get students thinking critically about privacy and its applications to computer science.`,
    topic: 'Privacy',
  },
  {
    title: '1.a: Ability to restrict access to oneself',
    summary:
      'Explores privacy as the ability to restrict who has access to a person and under what conditions.',
    body: `## Lens 1: Privacy is about the ability to restrict access to oneself

Most people colloquially understand privacy as the condition of restricted access. We have privacy when we can close a door, make a friends-only post on social media, or otherwise limit when and where others perceive us.

This conception is in line with **access-based approaches**, which cast privacy as about **who has access to an individual and under what conditions**.

Having access to an individual could entail:

- physical proximity to or contact with them
- learning information about them
- observing them

---

### Access as a Gateway

Through this lens, privacy functions **as a gate we can open or close to others**.

Using the example of a close friends list on social media:

- we **open** the access gateway by adding accounts to that list
- we **close** the access gateway by removing them

---

### Anti-informational Definitions of Privacy

Taken to its logical extreme, the access-based lens suggests that an individual enjoys perfect privacy when they are completely inaccessible to others.

We therefore lose privacy when our information becomes accessible to others.

One way to guarantee data's inaccessibility is to never produce it in the first place, leading some to conclude that privacy is best defined as **protection against the creation of information**.`,
    topic: 'Privacy',
  },
  {
  title: '1.a: Control over the flow of information',
  summary: 'Explores privacy as the ability to control how personal information is collected, shared, and used.',
  body: `## Lens 2: Privacy is about control over the flow of information

Privacy can also be understood as the ability to **control the flow of information about oneself**.

---

### Classic Control-Based Approaches

Control-based approaches consider privacy in terms of how data is not only accessed, but also:

- collected  
- shared  
- used  

Through this lens, privacy is more than just an access gateway that we can open or close. Instead, it is about **actively governing personal data throughout its lifecycle**, from creation through destruction.

Advocates of this approach argue that individuals should have meaningful control over their data at all stages. This idea is reflected in modern data privacy regulations such as:

- the **European Union’s GDPR (General Data Protection Regulation)**  
- the **California Consumer Privacy Act (CCPA)**  

These frameworks require that individuals maintain a high level of control over their personal information for the duration of its existence.

---

### Defining Privacy as Control

Westin defines privacy as:

> "the claim of individuals, groups, or institutions to determine for themselves when, how and to what extent information about them is communicated to others" (1967, 7)

From this perspective, **privacy loss occurs when control over personal information is lost**.

For example, a **man-in-the-middle attack** intercepts communications along what was believed to be a private channel, violating privacy by undermining the sender’s ability to control the flow of information.

---

### Control vs. Access

A key difference between access-based and control-based approaches is how they treat potential access.

A control-based approach considers privacy to be compromised **even if no one actually reads the data**, as long as control has been lost.

Consider the metaphor of a diary:

- Someone takes your diary from your desk  
- Locks it in a safe  
- Never reads it  

From an **access-based perspective**:
- You have not lost privacy (no one accessed the contents)

From a **control-based perspective**:
- You *have* lost privacy, because the diary is no longer under your control

This illustrates how privacy, in this lens, depends not just on access, but on **ownership and control over information**.

---

### Contextual Integrity

In the last decade, Helen Nissenbaum’s theory of **contextual integrity** has gained traction, especially among computer scientists.

Contextual integrity is a theory of privacy developed within the landscape of 21st century computing. Nissenbaum proposes that privacy is best understood as the **"appropriate flow of personal information"**.

What counts as "appropriate" depends on five contextual parameters:

- the **data subject**  
- the **sender**  
- the **recipient**  
- the **type of information**  
- the **transmission principle** (e.g., confidentiality, notice, consent)

This approach allows individuals and societies to define acceptable data practices based on context. Because of this, it is:

- flexible  
- adaptable  
- responsive to evolving ethical norms  

Rather than relying on fixed rules, contextual integrity frames privacy as something that depends on **whether information flows appropriately within a given situation**.`,
  topic: 'Privacy',
},
  {
  title: '1.a: Separation of public and private spheres',
  summary: 'Examines privacy as the boundary between public and private spheres, including relational and action-based perspectives.',
  body: `## Lens 3: Privacy is about the separation of public and private spheres

A lens of privacy focused on the separation of public and private spheres is in line with the idea that certain kinds of information are **inherently private**.

Compared to contextual integrity, this view is more **rigid in its approach to boundary-setting**.

Traditionally, public-private distinctions have been understood in **spatial terms**:

- the **home** as a private sphere  
- the **town square** as a public sphere  

However, modern theories expand this idea to focus not just on *where*, but also on:

- **who** has access  
- **what** information or actions are involved  

---

### Spheres as Relational

Some theories suggest privacy is about **managing relationships** by controlling how different people access different parts of one’s private life.

A common representation is the **layered (or “onion”) model of privacy**, where:

- the **innermost layer** represents personal and bodily intimacy  
- the **middle layers** represent personal relationships  
- the **outer layer** represents civil society  

Privacy loss can be thought of as **peeling away these layers**, increasing vulnerability.

Voluntary sharing, on the other hand, can be:

> “a gesture of trust that, when received with sensitivity and trustworthiness, strengthens relationships” (Véliz 2024)

---

### Spheres as Action-Based

Other approaches define privacy not by *where* or *with whom*, but by **what actions should remain free from interference**.

This perspective argues that privacy protects a **sphere of personal action**, including:

- voting  
- making medical decisions  
- engaging in consensual relationships  

This aligns with the idea of a **constitutionally protected reasonable expectation of privacy**, as established in *Katz v. United States*.

Historically, privacy protections have supported autonomy in areas such as:

- family relationships  
- education  
- procreation  
- marriage  
- contraception  

---

### Delineating Public and Private

The boundary between public and private has continuously evolved, especially with new technologies.

For example:

- **Warren and Brandeis (1890)** argued for a legal right to privacy in response to new photographic technologies  
- They questioned whether everything visible through a camera should be considered public—and argued it should not  

This highlights how privacy depends on **actively defining and defending boundaries**.

---

### Technology and the Erosion of Boundaries

In the 21st century, technology enables **previously unimaginable intrusions** into private life.

Even traditionally private spaces, like the home, have become more **porous** due to digital technologies.

Information can now:

- leak outside intended boundaries  
- be collected without awareness  
- be shared beyond its original context  

This makes maintaining a clear separation between public and private spheres increasingly difficult.`,
  topic: 'Privacy',
},
  {
  title: '1.a: Plausible deniability and relational privacy',
  summary: 'Explores privacy as mathematical protection of identity and as a relational concept depending on who privacy is from.',
  body: `## Lens 4: Privacy is about plausible deniability

A more recent development in thinking about privacy comes from **cryptography**, where researchers define privacy in mathematical terms.

Through this lens, data is considered private when it **cannot be reliably uncovered or linked back to a specific individual**, preserving a person’s ability to **plausibly deny** a piece of information.

---

### Deniable Encryption

Canetti, Dwork, Naor, and Ostrovsky (1997) introduced the concept of **deniable encryption**.

In a deniable encryption scheme:

- a message can be decrypted with a **real key** to reveal the true message  
- or decrypted with a **fake key** to reveal an alternative message  

This allows someone to appear transparent without actually revealing the true content, thereby maintaining privacy.

---

### Differential Privacy

Dwork, McSherry, Nissim, and Smith (2006) developed **differential privacy (DP)**, a framework used in:

- privacy-preserving statistical analysis  
- machine learning  

Differential privacy works by introducing **carefully calibrated statistical noise** into data.

As a result:

- the inclusion or exclusion of any individual data point does not significantly affect the output  
- it becomes impossible to determine whether a specific person’s data is part of the dataset  

Because of this, individuals can **plausibly deny contributing their data**, even when aggregate insights are still useful.

---

### Comparing the Four Lenses

Across these lenses, privacy can be understood in different ways:

- **Access-based**: Privacy exists when others cannot access your information  
- **Control-based**: Privacy exists when you control how your information is used  
- **Public/private spheres**: Privacy exists when certain spaces and actions are protected from interference  
- **Plausible deniability**: Privacy exists when your identity or data cannot be definitively linked back to you  

Each lens highlights different aspects of what it means to be “private.”

---

## Privacy from Whom?

Privacy is fundamentally **relational** and must be understood in relation to a specific person or entity.

Consider the example:

> A couple having a quiet conversation in their home does not have privacy with respect to each other, but they do have privacy with respect to passersby who cannot hear or see them. (Véliz 2024)

This illustrates that privacy depends on **who we are trying to be private from**.

---

### Why This Matters

The desire for privacy varies depending on context:

- what we want to keep private  
- who we want to keep it private from  
- how we expect that privacy to be protected  

Different forms of privacy protection can promote important individual and societal benefits depending on the situation.

Understanding privacy as relational helps us design systems that better reflect **real-world expectations and needs**.`,
  topic: 'Privacy',
},
  {
  title: '1.b: Value of Privacy',
  summary: 'Explores the individual and societal benefits of privacy, and how its value varies across contexts and groups.',
  body: `## What Is Privacy Good For?

As previously seen, privacy can be understood in many different ways. While these conceptions vary, there is broad agreement that privacy supports important **goods** for both individuals and society.

Rather than arguing directly against the idea that “if I’ve done nothing wrong, I don’t need privacy,” this section explores a more useful question:

> What is privacy good for?

---

## Privacy in Society

On a societal level, privacy supports the functioning of a **liberal democratic system**, particularly by enabling:

- agency  
- equality  
- informed decision-making  

Some societal benefits of privacy include:

- **Protection from violence and bad actors**  
- **Development of countercultures**  
- **Political participation without judgment**  
- **Fairness by obscuring identity**  
- **Private control of property**  
- **Formation of different types of relationships**  

---

## Privacy for Individuals

Privacy also provides important benefits at the individual level, separate from broader societal effects.

These include:

- **Greater agency over one’s actions and identity**  
- **Personal development through experimentation**  
- **Freedom from being reduced to a single identity or characteristic**  
- **Control over what different people know about oneself**  

---

## Who Benefits from Privacy?

The value of privacy is not the same for everyone.

When individuals belong to groups, those group characteristics can be used to:

- infer information about all members of the group  
- target specific individuals based on group membership  

Organizations such as:

- governments  
- businesses  
- activist groups  

may also seek privacy for their own purposes.

---

### Privacy and Marginalized Groups

People in **historically marginalized groups** may place a higher value on privacy due to:

- risk of harassment or discrimination  
- surveillance by institutions or individuals  
- desire to challenge existing social norms  

Privacy can enable:

- experimentation outside dominant norms  
- association with others safely  
- freedom from being defined solely by identity  

---

## Complicating Privacy

Privacy is highly **context-dependent**.

People may value different types of privacy depending on:

- their background  
- their social position  
- the situation  

For example:

- privacy from governments or corporations may focus on **control and autonomy**  
- privacy from friends or family may relate more to **identity and relationships**  

---

### Trade-offs and Conflicts

Privacy can involve trade-offs with other values and may sometimes cause harm.

It can also **conflict with itself**, when:

- two parties both want privacy  
- but their desires cannot both be satisfied  

In these situations, questions arise about:

- who should receive privacy  
- under what conditions  

Laws and regulations often attempt to **formalize and resolve these conflicts**.`,
  topic: 'Privacy',
},
  {
  title: '1.b: Value of Privacy',
  summary: 'Explores the individual and societal benefits of privacy, and how its value varies across contexts and groups.',
  body: `## What Is Privacy Good For?

As previously seen, privacy can be understood in many different ways. While these conceptions vary, there is broad agreement that privacy supports important **goods** for both individuals and society.

Rather than arguing directly against the idea that “if I’ve done nothing wrong, I don’t need privacy,” this section explores a more useful question:

> What is privacy good for?

---

## Privacy in Society

On a societal level, privacy supports the functioning of a **liberal democratic system**, particularly by enabling:

- agency  
- equality  
- informed decision-making  

Some societal benefits of privacy include:

- **Protection from violence and bad actors**  
- **Development of countercultures**  
- **Political participation without judgment**  
- **Fairness by obscuring identity**  
- **Private control of property**  
- **Formation of different types of relationships**  

---

## Privacy for Individuals

Privacy also provides important benefits at the individual level, separate from broader societal effects.

These include:

- **Greater agency over one’s actions and identity**  
- **Personal development through experimentation**  
- **Freedom from being reduced to a single identity or characteristic**  
- **Control over what different people know about oneself**  

---

## Who Benefits from Privacy?

The value of privacy is not the same for everyone.

When individuals belong to groups, those group characteristics can be used to:

- infer information about all members of the group  
- target specific individuals based on group membership  

Organizations such as:

- governments  
- businesses  
- activist groups  

may also seek privacy for their own purposes.

---

### Privacy and Marginalized Groups

People in **historically marginalized groups** may place a higher value on privacy due to:

- risk of harassment or discrimination  
- surveillance by institutions or individuals  
- desire to challenge existing social norms  

Privacy can enable:

- experimentation outside dominant norms  
- association with others safely  
- freedom from being defined solely by identity  

---

## Complicating Privacy

Privacy is highly **context-dependent**.

People may value different types of privacy depending on:

- their background  
- their social position  
- the situation  

For example:

- privacy from governments or corporations may focus on **control and autonomy**  
- privacy from friends or family may relate more to **identity and relationships**  

---

### Trade-offs and Conflicts

Privacy can involve trade-offs with other values and may sometimes cause harm.

It can also **conflict with itself**, when:

- two parties both want privacy  
- but their desires cannot both be satisfied  

In these situations, questions arise about:

- who should receive privacy  
- under what conditions  

Laws and regulations often attempt to **formalize and resolve these conflicts**.`,
  topic: 'Privacy',
},
  {
  title: '1.c: Data Ownership and Surveillance Capitalism',
  summary: 'Introduces how data is generated, valued, and used in modern digital systems.',
  body: `## Data Ownership and Surveillance Capitalism

Human beings constantly generate data through:

- search histories  
- location tracking  
- social media interactions  
- purchases  

We also generate less obvious data, such as:

- heart rates  
- streaming preferences  
- political opinions  

These data points hold significant value for companies and governments. They enable:

- targeted advertising  
- political persuasion  
- law enforcement insights  

This raises important questions:

- Is generating data a form of labor?  
- Is data a kind of property?  
- Is data part of a person’s identity?  

The answers depend on how we conceptualize data, and different perspectives lead to different conclusions about ownership and use.`,
  topic: 'Privacy',
},
  {
  title: '1.c: Theory of Surveillance Capitalism',
  summary: 'Explains how corporations profit from collecting and monetizing personal data.',
  body: `## Theory of Surveillance Capitalism

The idea that “if a product is free, you are the product” reflects a shift in how value is created.

In surveillance capitalism:

- the **user is not the product**  
- the **user’s data is the product**  

Companies collect behavioral data to:

- build detailed user profiles  
- predict behavior  
- sell insights to advertisers, political campaigns, and others  

This model assumes that corporations **own the data they collect**, which raises important ethical and legal questions:

- Should companies have full ownership?  
- Should data extraction be limited?  
- Should alternative business models replace this system?  

How we answer these questions depends on how we define data ownership.`,
  topic: 'Privacy',
},
  {
  title: '1.c: Data as Labor',
  summary: 'Views data generation as a form of labor that may deserve compensation.',
  body: `## Data as Labor

This perspective treats data generation as a form of **work**.

Users create valuable data by:

- browsing  
- clicking  
- interacting with platforms  

This data generates profit for companies, often without compensation.

Possible solutions include:

- **micro-payments** for data usage  
- **data dividends** paid regularly to users  
- **shared ownership** of platforms  

This model would require:

- formal agreements (like labor contracts)  
- collective bargaining  
- limits on data collection  

It reframes users as **data workers** rather than passive participants.`,
  topic: 'Privacy',
},
  {
  title: '1.c: Data as Property',
  summary: 'Treats data as an ownable resource that can be bought, sold, and controlled.',
  body: `## Data as Property

This approach treats data like **property**, similar to physical or financial assets.

It is based on the idea that ownership comes from applying labor to something unowned.

In digital systems:

- users generate data through activity  
- platforms process and store that data  

This creates questions about ownership:

- does the user own the data?  
- does the platform own the data?  
- or is ownership shared?  

Possible outcomes include:

- data marketplaces  
- user-controlled data sales  
- stronger consent systems  

This model emphasizes **control and economic value**.`,
  topic: 'Privacy',
},
  {
  title: '1.c: Data as an Extension of the Self',
  summary: 'Frames personal data as part of identity that should not be commodified.',
  body: `## Data as an Extension of the Body or Self

Some data is deeply personal and closely tied to identity.

Examples include:

- medical records  
- personal writings  
- biometric data  

This perspective treats data as an **extension of the individual**, not as a commodity.

Implications include:

- strict privacy protections  
- limits on data monetization  
- restricted access for non-essential uses  

In some cases, it may be inappropriate for data to be sold at all.

This aligns with laws like **HIPAA**, which protect sensitive health data.`,
  topic: 'Privacy',
},
  {
  title: '1.c: Applying Data Ownership Models',
  summary: 'Explains how different models of data ownership may apply in different contexts.',
  body: `## Applying Data Ownership Models

Different types of data may require different ownership models.

For example:

- social media data → may align with **data as labor**  
- search engine data → may align with **data as property**  
- medical data → may align with **data as self**  

These models can coexist.

Rather than choosing one framework, it may be more effective to:

- apply different models to different contexts  
- balance economic value with ethical considerations  

There is currently no clear consensus on the best approach.`,
  topic: 'Privacy',
},
  {
  title: '1.c: Alternatives to Surveillance Capitalism',
  summary: 'Explores alternative business models and legal approaches to reduce reliance on data extraction.',
  body: `## Alternatives to Surveillance Capitalism

Surveillance capitalism is not the only way to generate profit.

Alternative models include:

### Subscription Services
Users pay directly, reducing reliance on data collection.

### Freemium Models
Basic services are free, with optional paid upgrades.

### Hardware-Based Models
Revenue comes from selling devices rather than data.

### Open Source and Crowdfunding
Development is funded through donations and community support.

### Contextual Advertising
Ads are based on content, not user tracking.

---

### Legal and Structural Alternatives

Other approaches include:

- stricter privacy regulations (e.g., GDPR)  
- limiting data collection entirely  
- treating data as a **public resource (data commons)**  

These models aim to reduce profit-driven surveillance while preserving useful data applications.`,
  topic: 'Privacy',
},
  {
  title: '1.d: Privacy Trade-Offs',
  summary: 'Introduces the idea that privacy often involves trade-offs with other societal and individual goods.',
  body: `## Privacy Trade-Offs

As discussed in the value of privacy, privacy provides important benefits across many contexts. At the same time, privacy often involves **trade-offs**.

More personal data can be exchanged for:

- greater safety  
- more convenience  
- improved research outcomes  
- more efficient systems  

Rather than deciding whether these trade-offs are "worth it," a better question is:

> What goods might we trade privacy for?

This section explores common contexts where these trade-offs arise.`,
  topic: 'Privacy',
},
  {
  title: '1.d: Privacy vs Security',
  summary: 'Explores how privacy is often traded for increased security in policing and national defense.',
  body: `## Privacy vs Security

Privacy is often traded for **security**, especially in policing and national security contexts.

Governments may collect:

- internet history  
- biometric data  
- travel records  
- communication metadata  

to prevent harm and detect threats.

---

### Common Justifications

Four common arguments are used to justify surveillance:

- **"Just trust us"** → Authorities are assumed to act responsibly  
- **"Nothing to hide"** → Only wrongdoers should fear surveillance  
- **"Security trumps"** → Safety outweighs privacy concerns  
- **"Consent"** → Users implicitly agree by sharing data  

---

### Criticisms

Critics argue that:

- surveillance powers have historically been abused  
- privacy protects more than wrongdoing (e.g., identity, beliefs)  
- laws and norms change over time  
- individuals often lack meaningful consent  

---

### Not Always Opposed

Privacy and security are not always mutually exclusive.

In some cases:

- encryption strengthens both  
- privacy protections prevent misuse of sensitive data  

This suggests that privacy can sometimes be a **foundation of security**, not just a trade-off.`,
  topic: 'Privacy',
},
  {
  title: '1.d: Privacy vs Convenience',
  summary: 'Examines how users trade privacy for faster, easier, and more personalized services.',
  body: `## Privacy vs Convenience

Privacy is often traded for **convenience** in everyday technologies.

Examples include:

- biometric authentication  
- personalized recommendations  
- smart home automation  

These systems rely on **continuous data collection**.

---

### Types of Convenience

Convenience can take several forms:

- **Speed** → faster access to services  
- **Personalization** → tailored content and recommendations  
- **Access** → full functionality requires data sharing  

---

### The Privacy Paradox

People often claim to value privacy but behave differently in practice.

This is known as the **privacy paradox**.

Possible explanations include:

- lack of understanding of data practices  
- poor design of privacy choices  
- network effects (everyone else is using it)  

This suggests that privacy decisions are influenced by **how choices are presented**, not just personal values.`,
  topic: 'Privacy',
},
  {
  title: '1.d: Privacy vs Public Health',
  summary: 'Explores how personal data is used to improve population health outcomes.',
  body: `## Privacy vs Public Health

Privacy may be traded to support **public health goals**.

Examples include:

- electronic health records  
- contact tracing  
- epidemic monitoring  
- mental health mapping  

These systems help:

- detect outbreaks earlier  
- improve treatments  
- manage disease spread  

---

### The Trade-Off

The key question is:

> Do improvements in population health justify increased visibility into personal data?

Balancing these interests requires careful consideration of both **individual privacy** and **collective well-being**.`,
  topic: 'Privacy',
},
  {
  title: '1.d: Privacy vs Research',
  summary: 'Explores the tension between data-driven research and protecting participant privacy.',
  body: `## Privacy vs Research

Scientific research often depends on access to **personal data**.

Examples include:

- medical studies  
- urban planning  
- economic analysis  

---

### The Trade-Off

More detailed data enables:

- stronger findings  
- better insights  

But also increases the risk of:

- reidentification  
- exposure of sensitive information  

---

### Not Always a Conflict

Privacy and research can sometimes coexist through:

- anonymization  
- restricted access  
- controlled data sharing  

This shows that privacy risks can be **managed**, not just eliminated.`,
  topic: 'Privacy',
},
  {
  title: '1.d: Privacy vs Economic Efficiency',
  summary: 'Examines how personal data improves markets while reducing individual control.',
  body: `## Privacy vs Economic Efficiency

Privacy is often traded to improve **economic efficiency**.

Data enables:

- better credit scoring  
- targeted advertising  
- optimized pricing  
- resource allocation  

---

### Benefits

These systems can:

- improve decision-making  
- increase market efficiency  
- expand access to services  

---

### Costs

However, they also:

- reduce individual control over data  
- enable tracking and profiling  
- increase dependence on data collection  

This creates a tension between **market performance** and **personal privacy**.`,
  topic: 'Privacy',
},
  {
  title: '1.d: Privacy vs Privacy',
  summary: 'Explores situations where protecting one group’s privacy reduces another’s.',
  body: `## Privacy vs Privacy

Sometimes privacy conflicts with itself.

Protecting one person’s privacy may reduce another’s.

---

### Types of Trade-Offs

Three common types include:

- **Distributional** → privacy burdens shift between groups  
- **Directional** → privacy is lost to one group but gained from another  
- **Dynamic** → privacy is traded across time  

---

### Examples

- increased surveillance in certain neighborhoods  
- ride-sharing vs public transit visibility  
- pre-screening programs like TSA PreCheck  

---

### Key Insight

Privacy trade-offs are often not about gaining or losing privacy, but about:

> who has privacy, from whom, and when

Understanding this helps clarify how policies shape privacy outcomes across society.`,
  topic: 'Privacy',
},
  {
  title: '1.e: Consent',
  summary: 'Introduces consent as a primary tool for protecting privacy and explores its limitations.',
  body: `## Consent

What is the best way to protect privacy?

For many people, the answer begins—and ends—with **consent**.

Consent can be a powerful tool, but it is not a perfect or universal solution.

This section explores:

- what consent is  
- how it works in digital privacy  
- where it succeeds  
- where it fails  
- how it can be improved  

The goal is to understand both the **strengths and limitations** of a consent-based model.`,
  topic: 'Privacy',
},
  {
  title: '1.e: What Is Consent?',
  summary: 'Defines consent and explains its role in granting permission and respecting autonomy.',
  body: `## What Is Consent?

Consent is the process of granting another party permission to act in a space where normally only you have authority.

It transforms something that would otherwise be unacceptable into something acceptable.

For example:

- inviting someone into your home → guest  
- entering without permission → intruder  

---

### Why Consent Matters

Consent is important because it respects:

- autonomy  
- self-determination  
- the ability to take risks  
- the ability to refuse  

---

### Types of Consent

Consent is often categorized into:

- **Explicit** → clear, affirmative action (e.g., clicking “I agree”)  
- **Tacit** → inferred from inaction (e.g., not opting out)  
- **Implicit** → inferred from behavior (e.g., entering a situation)  

These differ in how much control the individual truly has.`,
  topic: 'Privacy',
},
  {
  title: '1.e: Consent and Digital Privacy',
  summary: 'Explores how consent functions differently in US and EU privacy systems.',
  body: `## Consent and Digital Privacy

Consent is a central concept in modern privacy law and theory.

Under GDPR, consent must be:

- freely given  
- specific  
- informed  
- unambiguous  

---

### Two Major Approaches

**United States (Market-Based)**

- users act as consumers  
- consent is tied to product usage  
- known as "notice and choice"  

**European Union (Rights-Based)**

- users are treated as data subjects  
- consent is separate from purchase decisions  
- stricter limits on what can be consented to  

---

These differences reflect deeper views about whether privacy is a **commodity** or a **fundamental right**.`,
  topic: 'Privacy',
},
  {
  title: '1.e: FRIES Framework for Consent',
  summary: 'Introduces a framework for evaluating meaningful consent in digital systems.',
  body: `## FRIES: A Framework for Meaningful Consent

FRIES is a framework for evaluating whether consent is meaningful:

---

### F — Freely Given

Consent must be free from:

- coercion  
- manipulation  
- lack of alternatives  

---

### R — Reversible

Users should be able to:

- withdraw consent easily  
- delete or limit access to data  

---

### I — Informed

Users must understand:

- what data is collected  
- how it is used  
- who has access  

---

### E — Engaged

Consent should be:

- active, not passive  
- intentional, not automatic  

---

### S — Specific

Consent should:

- apply to specific uses  
- allow granular control  
- prevent "function creep"  

---

FRIES provides a practical way to evaluate whether consent is truly meaningful.`,
  topic: 'Privacy',
},
  {
  title: '1.e: Consent in Practice',
  summary: 'Explores how design choices influence user consent decisions.',
  body: `## Consent in Practice

The design of digital interfaces strongly influences consent decisions.

Most users:

- do not change default settings  
- do not read privacy policies  

---

### Behavioral Design

Design choices can:

- highlight preferred options  
- hide alternatives  
- guide user decisions  

---

### Dark Patterns

Some systems use **dark patterns**:

- deceptive design choices  
- manipulation of user behavior  
- prioritizing company goals over user interests  

---

### Ethical Design

Good design can:

- improve clarity  
- increase understanding  
- support meaningful decision-making  

Consent is not just a legal concept—it is also a **design problem**.`,
  topic: 'Privacy',
},
  {
  title: '1.e: How Is Consent Upheld?',
  summary: 'Explains the roles of markets, users, governments, and watchdogs in enforcing consent.',
  body: `## How Is Consent Upheld?

Consent is enforced through multiple systems:

---

### Free Market

Companies may improve privacy practices to:

- avoid backlash  
- attract customers  
- maintain reputation  

---

### Users

Users can:

- use privacy tools  
- educate themselves  
- modify behavior  

---

### Government

Regulation:

- sets legal standards  
- limits what can be consented to  
- enforces accountability  

---

### Watchdogs

Organizations and journalists:

- expose wrongdoing  
- promote transparency  
- influence public awareness  

---

These systems work together to maintain consent—but each has limitations.`,
  topic: 'Privacy',
},
  {
  title: '1.e: Criticisms of the Consent Model',
  summary: 'Examines the limitations and failures of consent as a privacy protection tool.',
  body: `## Criticisms of the Consent Model

Some scholars argue consent is not enough to protect privacy.

---

### Core Critiques

- consent is often superficial  
- users lack time and understanding  
- responsibility is shifted onto individuals  

---

### Key Problems

**Time Burden**

- privacy policies are long and complex  
- users cannot realistically evaluate all choices  

**Consent Fatigue**

- repeated requests reduce engagement  

**Aggregation Effect**

- small data points combine into detailed profiles  

**Illusion of Choice**

- opting out may not be realistic  

**Who Consents?**

- some people are affected without being asked  

---

These issues lead some to describe current systems as **“consent theater.”**`,
  topic: 'Privacy',
},
  {
  title: '1.e: Strengthening Consent',
  summary: 'Explores proposed improvements to make consent more meaningful.',
  body: `## Strengthening Consent

Several approaches aim to improve consent:

---

### Design Improvements

- clearer policies  
- better interfaces  
- reduced complexity  

---

### New Models

- **tiered consent** → multiple levels of choice  
- **meta-consent** → choose how future consent works  
- **dynamic consent** → update preferences over time  

---

### Technical Tools

- consent receipts  
- AI-assisted decision-making  
- encryption-based access control  

---

These approaches aim to reduce burden and increase user control.`,
  topic: 'Privacy',
},
  {
  title: '1.e: Alternatives to Consent-Based Privacy',
  summary: 'Explores non-consent approaches such as anonymization and regulation.',
  body: `## Alternatives to Consent-Based Privacy

Consent is not the only way to protect privacy.

---

### Technical Approaches

- anonymization  
- synthetic data  
- statistical noise (e.g., differential privacy)  

---

### Policy Approaches

- regulation and enforcement  
- data minimization  
- accountability systems  

---

### Paternalism

Some approaches shift decision-making away from users:

- governments set limits  
- companies must follow stricter rules  

---

### Contextual Integrity

Privacy depends on:

- context  
- roles  
- expectations  

Consent is just one part of this broader framework.

---

These alternatives recognize that consent alone may not be sufficient.`,
  topic: 'Privacy',
},
  {
  title: '2.a: What Is Accessibility?',
  summary: 'Introduces accessibility through universality, disability, and equity, emphasizing its role in inclusive system design.',
  body: `## What Is Accessibility?

Entire populations are affected by the computational choices made in technology design. As technology becomes more embedded in how people live and work, it is crucial to recognize that accessibility cannot be captured by a single definition.

For this primer, accessibility is framed through three key perspectives:

- **Universality**
- **Disability**
- **Equity**

---

### Accessibility Is Not Secondary

Accessibility is often treated as something that comes *after* functionality or efficiency. In reality, accessibility is inseparable from the systems we use every day.

Well-designed systems are inherently accessible because they:

- account for the needs of their users  
- minimize barriers to use  

For the purposes of this primer, something is considered accessible when it is intentionally designed to **address user needs and reduce barriers**.

---

## Accessibility through Universality

**Universal design** is a broad, utilitarian approach to accessibility.

While definitions vary, most agree that universal design aims to:

- create environments usable by as many people as possible  
- reduce the need for adaptation or specialized tools  

In practice, this looks like systems that:

- work “out of the box” for most users  
- rely on shared human capabilities  

However, this approach has limitations:

- it may overlook users with needs at the margins  
- designing for “most people” can exclude some groups  

---

## Accessibility through Disability

Accessibility can also be understood by focusing directly on **disability**.

There are four commonly recognized categories:

- visual  
- hearing  
- mobility  
- cognitive  

Disability can be:

- **permanent**  
- **temporary**  
- **situational**  

This perspective emphasizes:

- designing *with* disabled users  
- incorporating lived experiences  
- addressing specific accessibility needs directly  

---

## Accessibility through Equity

Accessibility is also closely tied to **equity**.

Digital equity refers to a state where:

> every person and community has the necessary technology to fully participate in society, democracy, and the economy.

Barriers to access often reflect broader social inequalities, including:

- income  
- race  
- gender  

This leads to what is known as the **digital divide**, where:

- marginalized groups have reduced access to technology  
- disparities in outcomes are reinforced  

From this perspective, accessibility means ensuring that **all groups can meaningfully access and benefit from technology**.

---

## A Dynamic Approach to Accessibility

These three perspectives represent just a small portion of how accessibility can be understood.

What makes accessibility especially important—and challenging—is that it is:

- constantly evolving  
- context-dependent  
- shaped by social and technological change  

By considering **universality, disability, and equity together**, we can better:

- understand accessibility  
- identify barriers  
- design more inclusive systems  

Accessibility is not just a technical concern—it is a **social, ethical, and design challenge**.`,
  topic: 'Accessibility',
},
  {
  title: '3.a: What Is Bias?',
  summary: 'Introduces bias in automated decision-making systems and why it matters.',
  body: `## What Is Bias?

Automated decision-making (ADM) systems are increasingly embedded in everyday life, from healthcare to transportation to hiring.

Like human decision-making, these systems can be flawed. One major source of error is **bias**.

Bias is any systematic process that:
- favors certain groups  
- disadvantages others  
- relies on inaccurate or stereotypical assumptions  

Understanding bias is essential because both human and automated systems are imperfect. The goal is not perfection, but **minimizing harm and inequity**.`,
  topic: 'Automated Decision-Making',
},
  {
  title: '3.a: Sources of Bias in Automated Decision-Making Systems',
  summary: 'Explains where bias enters systems across the machine learning lifecycle.',
  body: `## Sources of Bias

Bias can occur at multiple stages of an automated decision-making system:

- data collection  
- model creation  
- evaluation  
- deployment  

Each stage introduces opportunities for bias to enter or be amplified.`,
  topic: 'Automated Decision-Making',
},
  {
  title: '3.a: Bias in Data Curation',
  summary: 'Explores how bias is introduced through data collection and representation.',
  body: `## Bias in Data Curation

Bias often begins with data.

Data curation includes:
- how data is collected  
- how it is labeled  
- which populations are included  

---

### Historical Bias
Occurs when datasets reflect societal inequalities.

---

### Representation Bias
Occurs when certain groups are:
- underrepresented  
- excluded  

---

### Measurement Bias
Occurs when proxy variables are used for complex concepts.`,
  topic: 'Automated Decision-Making',
},
  {
  title: '3.a: Bias in Model Creation',
  summary: 'Explains how model design decisions introduce or amplify bias.',
  body: `## Bias in Model Creation

Bias can emerge during model design and training.

---

### Aggregation Bias
Treating different groups as the same.

---

### Learning Bias
Optimizing for majority groups while ignoring minority errors.

---

### Evaluation Bias
Testing datasets do not reflect real-world diversity.`,
  topic: 'Accessibility',
},
  {
  title: '3.a: Bias in Model Deployment',
  summary: 'Explains how bias appears when systems are used in real-world contexts.',
  body: `## Bias in Model Deployment

Even well-designed systems can produce harmful outcomes when deployed improperly.

This happens when:
- systems are used in new populations  
- assumptions no longer hold  
- environments differ from training data`,
  topic: 'Automated Decision-Making',
},
  {
  title: '3.a: Conclusion',
  summary: 'Summarizes how bias appears across the system lifecycle.',
  body: `## Conclusion

Bias can occur at every stage of an automated decision-making system:

- data  
- model design  
- evaluation  
- deployment  

Reducing bias requires:
- critical examination of data  
- awareness of assumptions  
- intentional design choices  

Building fair systems requires both technical and social awareness.`,
  topic: 'Automated Decision-Making',
},
  {
  title: '2.b: Intersections with Other Values',
  summary: 'Explores how accessibility interacts with values like privacy, security, usability, and more.',
  body: `## Intersections with Other Values

The development of inclusive technology requires understanding how accessibility intersects with other values such as:

- privacy  
- security  
- usability  
- sustainability  
- transparency  

These are often treated as separate goals, but they do not have to be mutually exclusive.

In many cases, prioritizing accessibility leads to:
- more innovative systems  
- more equitable outcomes  
- better user experiences  

---

## Why Accessibility Gets Overlooked

Accessibility is often deprioritized due to misconceptions:

- it only benefits a small group  
- it is too expensive  
- it can be added later  

In reality:
- over 1 billion people globally experience disability  
- many impairments are temporary or situational  

Ignoring accessibility can lead to:

- ethical harm → exclusion  
- legal risk → ADA / EU laws  
- business loss → missed markets  

---

## The Framework

To analyze these intersections, we use three lenses:

- **Disability** → focuses on lived experiences  
- **Equity** → examines fairness and power  
- **Universality** → considers benefits for all users  

These lenses help identify both:
- tensions  
- synergies`,
  topic: 'Accessibility',
},
  {
  title: '2.b: Accessibility & Privacy',
  summary: 'Examines trade-offs between accessibility and personal data collection.',
  body: `## Accessibility & Privacy

Many assistive technologies require **sensitive data** to function.

This raises a key question:

> What is the privacy cost for access?

---

### Tension

- voice assistants require audio data  
- eye-tracking uses biometric data  
- learning tools monitor behavior  

Disabled users may be forced to give up more privacy than others.

---

### Synergy

Privacy and accessibility align when:

- controls are clear and understandable  
- permissions are easy to manage  
- interfaces are readable and navigable  

---

### Takeaway

Accessibility and privacy can be in real tension, but better design can reduce the burden—even if it cannot eliminate it.`,
  topic: 'Accessibility',
},
  {
  title: '2.b: Accessibility & Security',
  summary: 'Explores how security measures can both hinder and support accessibility.',
  body: `## Accessibility & Security

Security features often create barriers for users with disabilities.

---

### Tension

Examples include:

- CAPTCHA → difficult for vision or cognitive impairments  
- biometric login → not usable for all users  
- complex authentication → high cognitive load  

---

### Synergy

Accessible security improves protection:

- password managers reduce cognitive load  
- plain language warnings improve understanding  
- simplified authentication improves usability  

---

### Takeaway

When security is designed accessibly, it becomes stronger and more usable for everyone.`,
  topic: 'Accessibility',
},
  {
  title: '2.b: Accessibility & Sustainability',
  summary: 'Explores the relationship between environmental efficiency and accessibility.',
  body: `## Accessibility & Sustainability

Sustainability focuses on reducing resource usage, while accessibility focuses on equitable access.

---

### Tension

- low-power modes reduce brightness and contrast  
- this can make devices unusable for low-vision users  

---

### Synergy

- lightweight code improves load times  
- faster systems help users with cognitive disabilities  
- reduced data usage benefits low-bandwidth users  

---

### Takeaway

Efficient systems can improve accessibility—but design must avoid reducing usability for certain groups.`,
  topic: 'Accessibility',
},
  {
  title: '2.b: Accessibility & Usability',
  summary: 'Shows how accessibility and usability are closely connected.',
  body: `## Accessibility & Usability

Accessibility and usability are deeply interconnected.

---

### Tension

Problems arise when:

- too many features overwhelm users  
- interfaces become cluttered  
- accessibility tools are poorly organized  

---

### Synergy

Most accessibility features improve usability:

- high contrast → better visibility  
- clear layouts → easier navigation  
- keyboard navigation → broader access  

---

### Takeaway

In most cases:

> Designing for accessibility is designing for usability.`,
  topic: 'Accessibility',
},
  {
  title: '2.b: Accessibility & Transparency',
  summary: 'Explores how accessibility affects the understandability of information.',
  body: `## Accessibility & Transparency

Transparency is only meaningful if users can **understand the information**.

---

### Tension

- complex reports are technically transparent but unusable  
- dense language excludes many users  

---

### Synergy

Accessible transparency includes:

- alt text  
- captions  
- plain language  
- readable formats  

---

### Takeaway

Transparency without accessibility is not real transparency.`,
  topic: 'Accessibility',
},
  {
  title: '2.b: Accessibility & Accountability',
  summary: 'Examines how accessibility enables meaningful feedback and recourse.',
  body: `## Accessibility & Accountability

Accountability requires users to report problems.

---

### Tension

- complex forms  
- inaccessible CAPTCHAs  
- unclear processes  

These prevent users from reporting issues.

---

### Synergy

Accessible accountability includes:

- simple reporting tools  
- multiple input formats (text, voice, video)  
- clear confirmation messages  

---

### Takeaway

Without accessible reporting, accountability systems fail.`,
  topic: 'Accessibility',
},
  {
  title: '2.b: Accessibility & Safety',
  summary: 'Explores how safety features can both conflict with and support accessibility.',
  body: `## Accessibility & Safety

Safety features protect users—but can also create barriers.

---

### Tension

- content moderation may censor disability-related content  
- read-aloud features may expose private information  

---

### Synergy

Accessible safety features include:

- content warnings  
- mute/block tools  
- adjustable filters  

---

### Takeaway

Accessible safety tools give users more control while improving protection.`,
  topic: 'Accessibility',
},
  {
  title: '2.b: Conclusion',
  summary: 'Summarizes how accessibility interacts with other values.',
  body: `## Conclusion

Accessibility often interacts with other values in complex ways.

Many tensions arise not from inherent conflict, but from:

- poor design decisions  
- lack of resources  
- systemic oversight  

When designed intentionally, accessibility can:

- strengthen privacy  
- improve security  
- enhance usability  
- support equity  

Accessibility is not a competing goal—it is a **foundational design principle**.`,
  topic: 'Accessibility',
},
  {
  title: '2.c: Biases in Design',
  summary: 'Introduces how cognitive biases affect accessibility and design decisions.',
  body: `## Biases in Design

One of the biggest challenges to accessible technology is **cognitive bias**.

Cognitive biases are systematic patterns in how we think that can lead us to:

- overlook certain users’ needs  
- make assumptions about how people interact with systems  
- unintentionally create barriers  

Accessibility spans three dimensions:

- Universality  
- Disability  
- Equity  

Bias undermines all three.

---

## Why Bias Matters in Design

Bias influences:

- what we notice  
- what we prioritize  
- whose needs we overlook  

Accessibility requires recognizing that our ideas of:

- "normal"  
- "intuitive"  
- "good design"  

are shaped by our own experiences.

---

## Key Idea

> Bias recognition must come before bias prevention.

We cannot design accessible systems unless we understand how our assumptions influence design decisions.`,
  topic: 'Accessibility',
},
  {
  title: '2.c: Mental Models and Familiarity',
  summary: 'Explores how designers rely on personal experience when shaping systems.',
  body: `## Mental Models and Familiarity

People form **mental models** of how technology works based on past experience.

These act as shortcuts (heuristics) that help us:

- navigate systems quickly  
- make decisions efficiently  

---

### The Problem

Designers often assume their own mental models are universal.

This can lead to systems that:

- work well for people like the designer  
- fail for users with different abilities or backgrounds  

---

### Example

Many systems assume:

- mouse-based navigation  

This excludes users who rely on:

- keyboard navigation  
- assistive technologies  

---

### Takeaway

Design must account for **diverse mental models**, not just the designer’s.`,
  topic: 'Accessibility',
},
  {
  title: '2.c: The Invisibility of Bias',
  summary: 'Explains how unconscious bias shapes decisions without awareness.',
  body: `## The Invisibility of Bias

Biases often operate **unconsciously**.

They feel:
- natural  
- intuitive  
- correct  

---

### Why This Happens

Biases come from automatic mental processes that:

- prioritize speed over accuracy  
- rely on familiar patterns  

---

### Bias Blind Spot

People are more likely to:

- recognize bias in others  
- overlook bias in themselves  

---

### Design Impact

Designers may:

- commit early to one idea  
- ignore alternatives  
- fail to question assumptions  

---

### Takeaway

Bias is hard to detect because it feels correct.

Recognizing this is critical to designing inclusively.`,
  topic: 'Accessibility',
},
  {
  title: '2.c: Exclusion in Design',
  summary: 'Explains how unexamined bias leads to systemic exclusion.',
  body: `## Exclusion

When bias goes unexamined, systems naturally center dominant groups.

These groups are often:

- overrepresented in design teams  
- prioritized in research  
- reflected in product decisions  

---

### Impact

This leads to designs that:

- overlook marginalized users  
- reinforce inequality  
- create barriers to access  

---

### Real-World Consequences

Inaccessible systems can prevent people from:

- accessing services  
- participating in civic life  
- pursuing education  
- working  

---

### Takeaway

Bias is not just a design flaw—it can create **systemic exclusion**.`,
  topic: 'Accessibility',
},
  {
  title: '2.c: Key Biases in Design',
  summary: 'Introduces common cognitive biases that affect design decisions.',
  body: `## Key Biases in Design

Designers are affected by many cognitive biases.

These biases influence decisions and can lead to inaccessible systems.

---

### Automation Bias

Trusting automated systems too much and ignoring errors.

---

### Availability Bias

Relying on examples that are easiest to recall.

---

### Choice Overload

Too many options cause confusion and decision paralysis.

---

### Confirmation Bias

Favoring information that supports existing beliefs.

---

### Framing Effect

Decisions influenced by how information is presented.

---

### Implicit Bias

Subconscious associations about groups (e.g., race, gender, ability).

---

### Takeaway

These biases are common and often invisible—but they significantly shape design outcomes.`,
  topic: 'Accessibility',
},
  {
  title: '2.c: Important Notes on Bias',
  summary: 'Explains how biases interact and compound across systems.',
  body: `## Important Notes on Bias

Biases rarely operate alone.

---

### Bias Overlap

Different biases can interact.

Example:
- implicit bias influences data selection  
- availability bias shapes research  
- confirmation bias reinforces assumptions  

---

### Bias Aggregation

Bias compounds across levels:

- individual → designer decisions  
- team → interpretation of feedback  
- organization → hiring and priorities  
- industry → standards and norms  

---

### Why This Matters

This compounding effect explains why:

- accessibility issues persist  
- bias becomes systemic  

---

### Takeaway

Individual awareness is not enough.

Reducing bias requires changes at:
- team level  
- organizational level  
- industry level`,
  topic: 'Accessibility',
},
  {
  title: '2.d: Core Design Concepts',
  summary: 'Introduces foundational design principles that support accessibility and usability.',
  body: `## Core Design Concepts

Design processes provide structure from idea to implementation, helping designers:

- gather user needs  
- test ideas  
- iterate through feedback  

Accessibility and usability are closely connected:

- **Usability** → ease of use  
- **Accessibility** → removing barriers for diverse users  

---

### Universal Design Principles

Universal design aims to create systems usable by the widest range of people.

Key principles include:

- equitable use  
- flexibility in use  
- simple and intuitive use  
- perceptible information  
- tolerance for error  
- low physical effort  
- size and space for use  

These are not strict rules, but a **framework for identifying exclusion**.

---

## Key Design Concepts

### Simplifying Choices (Hick’s Law)

The time to make a decision increases with the number of options.

Reducing choices:
- improves efficiency  
- reduces cognitive load  
- supports users with cognitive differences  

---

### Affordances and Signifiers

- **Affordance** → what actions are possible  
- **Signifier** → how those actions are communicated  

Clear affordances:
- reduce confusion  
- improve usability  
- support accessibility  

---

### Mapping

Mapping connects controls to outcomes.

Good mapping:
- improves predictability  
- reduces errors  
- supports learnability  

---

### Feedback

Feedback communicates the result of an action.

Good feedback:
- confirms actions  
- shows system state  
- supports users with sensory differences  

---

### Takeaway

Accessible design is not just about compliance—it is about **clear, intuitive, and predictable systems**.`,
  topic: 'Accessibility',
},
  {
  title: '2.d: Design Orientations',
  summary: 'Explores different approaches to defining who we design for.',
  body: `## Design Orientations: Who Are We Designing For?

Design orientations define how we prioritize users.

They shape:
- what success looks like  
- whose needs are centered  
- how accessibility is approached  

---

### Target Group

Design focuses on a specific user population.

Pros:
- addresses specialized needs effectively  

Cons:
- may exclude others  

---

### Universal Design

Design aims to work for as many people as possible.

Pros:
- reduces exclusion  
- creates consistent experiences  

---

### Inclusive Design

Design begins with those who are excluded.

Key idea:
- design *with* marginalized users, not just for them  

Inclusive design considers:
- ability  
- language  
- culture  
- age  
- identity  

---

### Curb Cut Effect

Designing for one group can benefit many.

Example:
- curb cuts help wheelchair users, but also:
  - parents with strollers  
  - travelers with luggage  

However:
- benefits are not guaranteed  

---

### Takeaway

Different orientations:
- can be combined  
- shape accessibility outcomes  

Design choices determine who is included—and who is left out.`,
  topic: 'Accessibility',
},
  {
  title: '2.d: Design Process',
  summary: 'Explores methods for incorporating users into the design lifecycle.',
  body: `## Design Process

Design processes determine how users are included in system development.

Accessibility standards (e.g., ADA, WCAG) provide a **baseline**, but meaningful accessibility requires more.

---

## User Research

User research helps understand real user needs.

Methods include:

- **User Personas** → fictional profiles based on real data  
- **User Stories** → user goals and motivations  
- **Contextual Inquiry** → observing users in real environments  

This shifts design from assumptions → evidence.

---

## Participatory Design

Users are actively involved throughout the design process.

- users provide ongoing input  
- designers retain decision control  

This improves relevance and inclusion.

---

## Co-Design

Users become equal partners in design.

They:
- define problems  
- generate ideas  
- help make decisions  

This leads to:
- better outcomes  
- deeper understanding  
- more inclusive systems  

---

## Levels of Participation

Frameworks like **Arnstein’s Ladder of Participation** help evaluate:

- how much power users actually have  
- whether participation is meaningful or superficial  

---

### Takeaway

The more users are involved:
- the more accessible the system becomes  

Accessibility is not just a feature—it is a **process**.`,
  topic: 'Accessibility',
},
  {
  title: '3.b: Foundations of Fairness',
  summary: 'Introduces algorithmic fairness and its role in decision-making systems.',
  body: `## Foundations of Fairness

As automated systems replace humans in high-impact decisions, ensuring **fair outcomes** becomes critical.

In social contexts, fairness relates to:
- justice  
- equality  
- due treatment  

In computational systems, fairness is translated into **mathematical definitions**.

---

### No Single Definition

Fairness has no universal definition.

Instead, it depends on:
- context  
- domain  
- values  

Different definitions of fairness often **conflict with each other**, meaning:

> Not all fairness goals can be satisfied at the same time.

---

### Fairness as a Design Decision

Fairness is not purely technical.

It requires decisions about:
- whose interests matter  
- what trade-offs are acceptable  
- what outcomes are prioritized  

---

### Key Insight

Algorithmic fairness is both:
- a **technical problem**  
- a **social and ethical problem**`,
  topic: 'Accessibility',
},
  {
  title: '3.b: Sensitive Attributes and the Proxy Problem',
  summary: 'Explains how sensitive attributes and proxy variables affect fairness.',
  body: `## Sensitive Attributes

Sensitive attributes include:
- race  
- gender  
- socioeconomic status  
- other protected characteristics  

These are often necessary to:
- detect bias  
- measure disparities  
- evaluate fairness  

---

## The Proxy Problem

Even if sensitive attributes are removed, bias can still occur.

This is because other variables act as **proxies**.

Examples:
- zip code → race or income  
- credit history → socioeconomic status  
- language patterns → ethnicity  

---

### Fairness Through Unawareness (Myth)

Removing sensitive attributes does **not** guarantee fairness.

Models can:
- infer hidden patterns  
- recreate group distinctions  

---

### Takeaway

Fairness requires:
- understanding correlations  
- engaging with sensitive data carefully  

Ignoring sensitive attributes can actually **hide bias, not remove it**.`,
  topic: 'Automated Decision-Making',
},
  {
  title: '3.b: Individual Fairness',
  summary: 'Explains fairness as treating similar individuals similarly.',
  body: `## Individual Fairness

Individual fairness is based on the idea:

> Similar individuals should receive similar outcomes.

---

### Key Component: Similarity

Fairness depends on how we define:
- similarity  
- relevant features  
- distance between individuals  

Example:
- two applicants with similar experience → similar hiring outcomes  

---

### Strengths

- prevents arbitrary discrimination  
- ensures consistency at the individual level  

---

### Limitations

- defining similarity is subjective  
- similarity metrics may reflect bias  
- can reinforce existing inequalities  

---

### Trade-Off

Individual fairness may:
- appear fair  
- but still allow group disparities  

---

### Takeaway

Fairness depends heavily on how similarity is defined—and that definition is never neutral.`,
  topic: 'Automated Decision-Making',
},
  {
  title: '3.b: Group Fairness',
  summary: 'Explores fairness across groups using statistical parity and error rates.',
  body: `## Group Fairness

Group fairness focuses on ensuring that **groups are treated equitably**.

Three major criteria are used:

---

### Independence

Predictions should not depend on group membership.

Goal:
- equal outcome rates across groups  

---

### Separation

Error rates should be equal across groups.

Goal:
- similar true/false positive rates  

---

### Sufficiency

Predictions should mean the same thing across groups.

Goal:
- equal interpretation of scores  

---

### Trade-Offs

These definitions:
- cannot all be satisfied simultaneously  
- reflect different fairness goals  

---

### Key Insight

Group fairness highlights structural inequality—but requires trade-offs in how fairness is enforced.`,
  topic: 'Automated Decision-Making',
},
  {
  title: '3.b: Importance of Fairness Research',
  summary: 'Explains how fairness research has shaped modern AI systems and policy.',
  body: `## Importance of Fairness Research

Fairness research has transformed how systems are designed and evaluated.

---

### Key Contributions

#### Quantitative Evaluation
- fairness metrics  
- disparity analysis  
- model audits  

#### Algorithmic Methods
- reweighting  
- debiasing techniques  
- constrained optimization  

#### Policy and Regulation
- informs laws and frameworks  
- influences AI governance  

#### Machine Learning Practice
- fairness is now evaluated alongside accuracy  
- models are assessed as multi-objective systems  

---

### Big Idea

Fairness research has turned fairness from:

- a moral idea  
→ into  
- a measurable system property  

---

### Takeaway

Every system with real-world impact carries **social responsibility**.

Fairness research helps make that responsibility:
- visible  
- measurable  
- actionable`,
  topic: 'Automated Decision-Making',
},
  {
  title: '3.c: Conceptions of Justice',
  summary: 'Explores different philosophical approaches to justice in AI systems.',
  body: `## Justice in AI

Justice refers to the idea that individuals should be treated fairly.

While fairness in AI is often defined mathematically, justice is broader and more philosophical. It reflects deeper questions about:

- what fairness should achieve  
- whose interests are prioritized  
- how systems should distribute benefits and harms  

---

## Two Core Approaches

### Process-Focused Justice

Focuses on how decisions are made.

Key principles:
- respect  
- trustworthiness  
- voice (participation)  
- neutrality  

Key questions:
- Are people treated with dignity?
- Can they contest decisions?
- Are processes transparent and accountable?

---

### Outcome-Focused Justice (Distributive Justice)

Focuses on the results of decisions.

Key concerns:
- distribution of resources  
- equality of opportunity  
- systemic inequality  

---

## Core Frameworks

Three major lenses:

- **Sufficiency** → ensuring minimum acceptable outcomes  
- **Priority** → supporting the most disadvantaged  
- **Equality of Opportunity** → ensuring fair access  

---

## Key Insight

Different conceptions of justice often:
- conflict with each other  
- cannot be fully satisfied simultaneously  

Justice in AI is not one definition—it is a **set of competing frameworks**.`,
  topic: 'Automated Decision-Making',
},
  {
  title: '3.c: Other Notions of Justice',
  summary: 'Introduces additional frameworks beyond traditional fairness models.',
  body: `## Other Notions of Justice

Beyond process and outcome-focused justice, many additional frameworks expand how we think about justice in AI.

These frameworks address:
- historical harm  
- knowledge exclusion  
- systemic inequality  
- environmental impact  

---

## Why This Matters

Traditional fairness approaches:
- focus on metrics  
- simplify complex social issues  

But justice requires:
- broader social awareness  
- understanding power and context  
- addressing systemic harm  

---

## Key Idea

Justice in AI is **multidimensional**.

Different frameworks highlight different kinds of harm and responsibility.`,
  topic: 'Automated Decision-Making',
},
  {
  title: '3.c: Restorative Justice',
  summary: 'Explores repairing harm and rebuilding relationships in AI systems.',
  body: `## Restorative Justice

Restorative justice focuses on repairing harm and rebuilding relationships.

Instead of only punishing wrongdoing, it asks:
- what harm occurred  
- how it can be repaired  
- how trust can be restored  

---

## Core Principles

- accountability  
- healing  
- dialogue  
- community repair  

---

## In AI Systems

Restorative justice asks:

- Who has been harmed by this system?
- Are affected communities involved in solutions?
- What steps exist to repair harm?

---

## Key Idea

Justice is not only about preventing harm—it is about **repairing it when it occurs**.`,
  topic: 'Automated Decision-Making',
},
  {
  title: '3.c: Epistemic Justice',
  summary: 'Examines how knowledge and perspectives are included or excluded in AI.',
  body: `## Epistemic Justice

Epistemic justice focuses on fairness in knowledge.

It asks:
- whose knowledge is valued  
- whose perspectives are ignored  

---

## Epistemic Injustice

Occurs when people are harmed in their role as knowers.

This includes:
- excluding lived experiences  
- privileging dominant perspectives  
- misrepresenting communities  

---

## In AI Systems

Epistemic injustice appears through:

- biased datasets  
- dominant cultural assumptions  
- limited representation  

---

## Key Questions

- Whose perspectives are included?
- Who can challenge the system?
- Are some voices being silenced?

---

## Takeaway

AI systems can reinforce knowledge inequality unless they actively include diverse perspectives.`,
  topic: 'Automated Decision-Making',
},
  {
  title: '3.c: Structural Justice',
  summary: 'Examines how AI systems reinforce or challenge existing power structures.',
  body: `## Structural Justice

Structural justice examines how systems interact with broader social structures.

It focuses on:
- institutions  
- power relationships  
- systemic inequality  

---

## Key Idea

Harm is not always intentional.

Systems can:
- reinforce inequality  
- amplify vulnerability  
- reproduce existing hierarchies  

---

## In AI Systems

Structural justice asks:

- Does the system reinforce power imbalances?
- Who benefits from the system?
- Who is made more vulnerable?

---

## Takeaway

Justice requires looking beyond individual decisions to the **systems that shape them**.`,
  topic: 'Automated Decision-Making',
},
  {
  title: '3.c: Environmental Justice',
  summary: 'Explores environmental impacts and inequalities in AI systems.',
  body: `## Environmental Justice

Environmental justice focuses on how environmental costs and benefits are distributed.

---

## In AI Systems

This includes:

- energy use of AI infrastructure  
- data center impacts  
- resource extraction  
- climate effects  

---

## Key Questions

- Who bears environmental costs?
- Are impacts concentrated in certain regions?
- Are vulnerable communities affected more?

---

## Global Considerations

AI development often impacts:

- the Global South  
- Indigenous communities  
- resource-limited regions  

---

## Takeaway

AI systems are not just digital—they have **real environmental consequences**.`,
  topic: 'Automated Decision-Making',
},
  {
  title: '3.c: Conclusion',
  summary: 'Summarizes the multidimensional nature of justice in AI.',
  body: `## Conclusion

AI systems do not exist in isolation.

They operate within:
- social systems  
- political systems  
- environmental systems  

---

## Key Insight

Justice in AI cannot be reduced to:

- a single metric  
- a single definition  
- a single solution  

---

## Core Idea

A system may:
- appear fair  
- but still reinforce inequality  
- or create harm in other ways  

---

## Final Takeaway

Justice in AI requires:

- technical understanding  
- ethical reasoning  
- social awareness  

It is not just about building better systems—it is about building **more just ones**.`,
  topic: 'Automated Decision-Making',
},
  {
  title: '3.d: Defining AI Governance',
  summary: 'Introduces AI governance as systems of accountability across technical and social domains.',
  body: `## Defining AI Governance

As AI systems grow in scale and impact, ensuring they align with legal standards and public accountability has become critical.

AI governance refers to the **rules, practices, and processes** used to guide how AI systems are:

- developed  
- deployed  
- monitored  

---

## Core Idea: Accountability

At its core, AI governance is about **accountability**.

> AI systems should be developed and used such that responsibility for harmful outcomes can be assigned.

This raises key questions:
- What are we measuring?
- How are we measuring it?
- Who is responsible?

---

## What Is Being Governed?

AI governance applies to both technical systems and their social context:

- **Data** → collection, labeling, bias, privacy  
- **Compute** → access, environmental cost, infrastructure  
- **Models** → training, architecture, transparency  
- **Deployment Contexts** → domains like healthcare, hiring, surveillance  
- **Decision-Making** → real-world impacts on people and institutions  

---

## How AI Is Governed

AI governance operates across five layers:

### Governance by Code
- data filtering, bias mitigation  
- model design and safety constraints  

### Governance by Coordination
- industry standards and best practices  

### Governance by Market
- incentives, funding, procurement pressure  

### Governance by Law
- regulations, policies, enforcement  

### Governance by Norm
- academic, professional, and social expectations  

---

## Key Insight

No single layer ensures accountability.

Effective governance emerges from the **interaction of all five layers**.`,
  topic: 'Automated Decision-Making',
},
  {
  title: '3.d: Stakeholders in AI Governance',
  summary: 'Explores the roles of governments, industry, academia, and civil society.',
  body: `## Stakeholders in AI Governance

AI governance is shaped by multiple stakeholders, each with different goals, power, and responsibilities.

---

## Four Major Stakeholder Groups

### Governments

Governments create and enforce laws.

Approaches vary globally:

- EU → centralized, comprehensive regulation  
- US → fragmented, sector-based regulation  
- China → centralized, state-led control  

Government roles include:
- legislation  
- regulatory enforcement  
- standard-setting  

---

### Industry

Companies are primary developers and deployers of AI systems.

They influence governance through:
- technical decisions  
- product design  
- market power  

Key actors include:
- model developers  
- infrastructure providers  
- application deployers  

---

### Academia

Academic institutions provide:
- independent research  
- policy recommendations  
- technical expertise  

They often act as:
- advisors to governments  
- contributors to standards  
- critics of industry practices  

---

### Civil Society

Civil society includes:
- nonprofits  
- advocacy groups  
- think tanks  
- journalists  

They:
- raise awareness  
- investigate harms  
- apply public pressure  

---

## Key Insight

AI governance is not controlled by one group.

It is a **negotiation between stakeholders with competing interests**.`,
  topic: 'Automated Decision-Making',
},
  {
  title: '3.d: AI Governance in Practice',
  summary: 'Examines real-world challenges and failures in AI governance.',
  body: `## AI Governance in Practice

Real-world cases show how difficult AI governance is to implement.

---

## Case Example: AI Companion Systems

AI companion platforms (e.g., chatbot-based systems) have raised serious concerns.

These systems:
- interact emotionally with users  
- collect sensitive personal data  
- operate at large scale  

---

## Key Governance Failures

### Regulatory Ambiguity

AI systems do not fit neatly into existing categories like:
- healthcare  
- social media  
- entertainment  

This creates gaps in regulation.

---

### Measurement Challenges

Some harms are difficult to detect, such as:
- emotional dependency  
- psychological impact  

---

### Misaligned Incentives

- companies optimize for engagement  
- safety may be deprioritized  

---

### Fragmented Accountability

Different governance layers respond differently:

- law → slow and reactive  
- market → acts after harm  
- industry → inconsistent self-regulation  
- civil society → limited enforcement power  

---

## Key Insight

AI governance is not a single system—it is a **complex, imperfect coordination problem**.

---

## Final Takeaway

Effective AI governance requires:

- coordination across all governance layers  
- participation from all stakeholder groups  
- systems that can adapt to rapid technological change  

Without this, the costs of failure are often borne by the most vulnerable populations.`,
  topic: 'Automated Decision-Making',
},
];

async function main() {
  console.log('Seeding the database');

  for (const account of config.defaultAccounts) {
    const role = (account.role as Role) || Role.USER;
    const emailPrefix = account.email.split('@')[0] || 'user';
    const firstName = emailPrefix;
    const lastName = 'User';
    const hashedPassword = await hash(account.password, 12);
    const userData: Prisma.UserCreateInput = {
      email: account.email,
      firstName,
      lastName,
      name: `${firstName} ${lastName}`,
      role,
      password: hashedPassword,
    };

    console.log(`  Creating user: ${account.email} with role: ${role}`);

    await prisma.user.upsert({
      where: { email: account.email },
      update: {
        firstName,
        lastName,
        name: `${firstName} ${lastName}`,
        role,
        password: hashedPassword,
      },
      create: userData,
    });
  }

  for (const content of srchContent) {
    const existing = await prisma.sRCHContent.findFirst({
      where: {
        title: content.title,
        topic: content.topic,
      },
    });

    if (!existing) {
      console.log(`  Creating SRCH content: ${content.title}`);

      await prisma.sRCHContent.create({
        data: content,
      });
    } else {
      console.log(`  Skipping existing SRCH content: ${content.title}`);
    }
  }

  console.log('Seeding complete');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });