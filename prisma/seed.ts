import { Prisma, Role } from '@prisma/client';
import * as config from '../config/settings.development.json';
import { prisma } from '../src/lib/prisma';

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
];

async function main() {
  console.log('Seeding the database');

  for (const account of config.defaultAccounts) {
    const role = (account.role as Role) || Role.USER;
    const emailPrefix = account.email.split('@')[0] || 'user';
    const firstName = emailPrefix;
    const lastName = 'User';

    const userData: Prisma.UserCreateInput = {
      email: account.email,
      firstName,
      lastName,
      name: `${firstName} ${lastName}`,
      role,
      password: 'changeme123',
    };

    console.log(`  Creating user: ${account.email} with role: ${role}`);

    await prisma.user.upsert({
      where: { email: account.email },
      update: {
        firstName,
        lastName,
        name: `${firstName} ${lastName}`,
        role,
        password: 'changeme123',
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