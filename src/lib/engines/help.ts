import type { ObjectValues } from '$lib/typeUtils';
import type { Equals } from 'tsafe';

export type HasHelpEntriesForEvery<T> = Equals<
  Extract<keyof typeof CharacterHelpLookup, ObjectValues<T>>,
  ObjectValues<T>
>;

// TODO, see if descriptions for various games need custom entries traits / skills in particular

/* eslint-disable no-sparse-arrays -- sparseness indicates no entry for that game */
export const CharacterHelpLookup = {
  'Small Guns': [
    'The use, care and general knowledge of small firearms - pistols, SMGs and rifles.',
    '35% + AG',
    '5% + (4 x AG)',
    '5% + (4 x AG)',
    '2% + (AG x 2) + (LK / 2)'
  ],
  'Big Guns': [
    'The operation and maintenance of really big guns - miniguns, rocket launchers, flamethrowers and such.',
    '10% + AG',
    '0% + (2 x AG)',
    '0% + (2 x AG)',
    '2% + (EN x 2) + (LK / 2)'
  ],
  Guns: [
    'Proficiency at using weapons that fire standard ammunition.',
    ,
    ,
    ,
    ,
    '2% + (AG x 2) + (LK / 2)'
  ],
  'Energy Weapons': [
    'The care and feeding of energy-based weapons.  How to arm and operate weapons that use laser or plasma technology.',
    '10% + AG',
    '0% + (2 x AG)',
    '0% + (2 x AG)',
    '2% + (PE x 2) + (LK / 2)',
    '2% + (PE x 2) + (LK / 2)'
  ],
  Explosives: [
    'The ability to handle things that go boom. Throwing / placing / avoiding blast zones. Grenades, mines, detonation packs, etc.',
    ,
    ,
    ,
    '2% + (PE x 2) + (LK / 2)',
    '2% + (PE x 2) + (LK / 2)'
  ],
  Unarmed: [
    'A combination of martial arts, boxing and other hand-to-hand martial arts.  Combat with your hands and feet.',
    '65% + ((ST + AG) / 2)',
    '30% + (2 x (AG + ST))',
    '30% + (2 x (AG + ST))',
    '2% + (EN x 2) + (LK / 2)',
    '2% + (EN x 2) + (LK / 2)'
  ],
  'Melee Weapons': [
    'Using non-ranged weapons in hand-to-hand, or melee combat - knives, sledgehammers, spears, clubs and so on.',
    '55% + ((ST + AG) / 2)',
    '20% + (2 x (AG + ST))',
    '20% + (2 x (AG + ST))',
    '2% + (ST x 2) + (LK / 2)',
    '2% + (ST x 2) + (LK / 2)'
  ],
  Throwing: [
    'The skill of muscle-propelled ranged weapons, such as throwing knives, spears and grenades.',
    '40% + AG',
    '0% + (4 x AG)',
    '0% + (4 x AG)'
  ],
  'First Aid': [
    'General healing skill.  Used to heal small cuts, abrasions and other minor ills.  In game terms, the use of first aid can heal more hit points over time than just rest.',
    '30% + ((PE + IN) / 2)',
    '0% + (2 x (PE + IN))',
    '30% + (2 x (PE + IN))'
  ],
  Doctor: [
    'The healing of major wounds and crippled limbs.  Without this skill, it will take a much longer period of time to restore crippled limbs to use.',
    '15% + ((PE + IN) / 2)',
    '5% + (PE + IN)',
    '0% + (PE + IN)'
  ],
  Medicine: [
    'General healing skill. Improves the effectiveness of healing related tools, medicines and unknown goos of many varieties.',
    ,
    ,
    ,
    '2% + (IN x 2) + (LK / 2)',
    '2% + (IN x 2) + (LK / 2)'
  ],
  Sneak: [
    'Quiet movement, and the ability to remain unnoticed. If successful, you will be much harder to locate. You cannot run and sneak at the same time.',
    '25% + AG',
    '5% + (3 x AG)',
    '0% + (3 x AG)',
    '2% + (AG x 2) + (LK / 2)',
    '2% + (AG x 2) + (LK / 2)'
  ],
  Lockpick: [
    'The skill of opening locks without the proper key. The use of lock-picks or electronic lock-picks will greatly enhance this skill.',
    '20% + ((PE + AG) / 2)',
    '10% + (PE + AG)',
    '10% + (PE + AG)',
    '2% + (PE x 2) + (LK / 2)',
    '2% + (PE x 2) + (LK / 2)'
  ],
  Steal: [
    'The ability to make the things of others your own.  Can be used to steal from people or places.',
    '20% + AG',
    '0% + (3 x AG)',
    '0% + (3 x AG)'
  ],
  Traps: [
    'The finding and removal of traps.  Also the setting of explosives for demolition purposes.',
    '20% + ((PE + AG) / 2)',
    '10% + (PE + AG)',
    '10% + (PE + AG)'
  ],
  Science: [
    'Covers a variety of high technology skills, such as computers, biology, physics and geology.',
    '25% + (2 x IN)',
    '0% + (4 x IN)',
    '0% + (4 x IN)',
    '2% + (IN x 2) + (LK / 2)',
    '2% + (IN x 2) + (LK / 2)'
  ],
  Repair: [
    'The practical application of the Science skill for fixing broken equipment, machinery and electronics.',
    '20% + IN',
    '0% + (3 x IN)',
    '0% + (3 x IN)',
    '2% + (IN x 2) + (LK / 2)',
    '2% + (IN x 2) + (LK / 2)'
  ],
  Pilot: [
    'The ability to operate and maintain all vehicles effectively.',
    ,
    ,
    '0% + (2 x (PE + AG))'
  ],
  Speech: [
    'The ability to communicate in a practical and efficient manner. The skill of convincing others that your position is correct. The ability to lie and not get caught.',
    '25% + (2 x CH)',
    '0% + (5 x CH)',
    ,
    '2% + (CH x 2) + (LK / 2)',
    '2% + (CH x 2) + (LK / 2)'
  ],
  Survival: [
    'Proficiency at cooking, making poisons, and crafting "natural" equipment and consumables. Also Yields increased benefits from food.',
    ,
    ,
    ,
    ,
    '2% + (EN x 2) + (LK / 2)'
  ],
  Barter: [
    'Trading and trade-related tasks. The ability to get better prices for items you sell, and lower prices for items you buy.',
    '20% + (2 x CH)',
    '0% + (4 x CH)',
    '0% + (4 x CH)',
    '2% + (CH x 2) + (LK / 2)',
    '2% + (CH x 2) + (LK / 2)'
  ],
  Gambling: [
    'The knowledge and practical skills related to wagering. The skill at cards, dice and other games.',
    '20% + (3 x LK)',
    '0% + (5 x LK)',
    '0% + (5 x LK)'
  ],
  Outdoorsman: [
    'Practical knowledge of the outdoors, and the ability to live off the land. The knowledge of plants and animals.',
    '5% + ((EN + IN) / 2)',
    '0% + (2 x (EN + IN))',
    '0% + (2 x (EN + IN))'
  ],
  Strength:
    'Raw physical strength. A high Strength is good for physical characters. Modifies: Hit Points, Melee Damage, and Carry Weight.',
  Perception:
    'The ability to see, hear, taste and notice unusual things. A high Perception is important for a sharpshooter.  Modifies: Sequence and ranged combat distance modifiers.',
  Endurance:
    'Stamina and physical toughness. A character with a high Endurance will survive where others may not. Modifies: Hit Points, Poison & Radiation Resistance, Healing Rate, and the additional hit points per level.',
  Charisma:
    'A combination of appearance and charm. A high Charisma is important for characters that want to influence people with words. Modifies: NPC reactions, and barter prices.',
  Intelligence:
    'Knowledge, wisdom and the ability to think quickly. A high Intelligence is important for any character. Modifies: the number of new skill points per level, dialogue options, and many skills.',
  Agility:
    'Coordination and the ability to move well. A high Agility is important for any active character. Modifies: Action Points, Armor Class, Sequence, and many skills.',
  Luck: 'Fate. Karma. An extremely high or low Luck will affect the character - somehow. Events and situations will be changed by how lucky (or unlucky) your character is.',
  'Hit Points':
    'How much damage your character can take before dying.  If you reach 0 HP or less, you are dead.',
  'Action Points':
    'The number of actions that the character can take during one combat turn.',
  'Armor Class': 'Modifies the chance to hit this particular character.',
  'Unarmed Damage':
    'The amount of bonus damage your character does in hand-to-hand combat.',
  'Melee Damage':
    'The amount of bonus damage your character does in hand-to-hand combat.',
  'Carry Weight':
    'The maximum amount of equipment your character can carry, in pounds.',
  'Companion Nerve':
    'How much bonus damage and defense your companions receive.',
  'Bonus Damage':
    'The percentage of bonus your character does in all forms of combat.',
  'Built To Destroy':
    'The flamer that burns twice as bright burns half as long. All weapons have +3% chance to Critical Hit, but equipment condition decays 15% faster.',
  'Four Eyes':
    'While wearing any type of glasses, you have +1 PER. Without glasses, you have -1 PER.',
  'Loose Cannon':
    'From frag grenades to throwing spears, you can throw weapons 30% faster at the cost of 25% less range.',
  'Trigger Discipline':
    'While using Guns and Energy Weapons, you fire 20% more slowly, but are 20% more accurate.',
  'Wild Wasteland':
    'Wild wasteland unleashes the most bizarre and silly elements of post-apocalyptic America. Not for the faint of heart or the serious of temperament.',
  Claustrophobia:
    'You have a fear of enclosed spaces (probably because of the mutants that live there). You gain +1 to SPECIAL attributes when outside, but suffer -1 when indoors.',
  'Early Bird':
    "Hey early risers! Enjoy a +2 to each of your SPECIAL attributes from 6 am to 12 pm, but suffer -1 from 6 pm to 6 am when you're not at your best.",
  Hoarder:
    "You gain +25 lbs. to your carrying capacity, but suffer a -1 to all attributes any time the weight you're carrying drops below 160 lbs.",
  'Hot Blooded':
    'When your health drops below 50% you gain 10% more damage, but you also suffer -2 to your Agility and Perception attributes.',
  "Logan's Loophole":
    "No one's going to put you out to pasture 'cause you're going to stay young (and level 30) forever! You'll Never again become addicted to chems, and they'll last twice as long... but after 30 you can kiss experience, perks, and skill points goodbye!",
  Sequence: 'Determines how soon in a combat turn your character can react.',
  'Healing Rate':
    'At the end of each day, your character will heal 1 HP for each point of Healing Rate.  When you rest, you heal every six hours.',
  'Critical Chance':
    'The chance to cause a critical hit in combat is increased by this amount.',
  'Damage Threshold': 'Damage Threshold',
  'Damage Res.':
    'Any damage taken is reduced by this amount. Damage Resistance can be increased by wearing armor.',
  'Radiation Res.':
    'The amount of radiation you are exposed to is reduced by this percentage. Radiation Resistance can be modified by the type of armor worn, and anti-radiation chems.',
  'Poison Res.': 'Reduces poison damage by this amount.',
  'Fire Res.': 'Reduces fire damage by this amount.',
  'Skill Rate': 'How many skill points you will receive at your next level.',
  'Perk Rate':
    'The amount of levels a character will have to gain in order to gain a perk. (Lower is better).',
  Age: 'Age',
  Gender: 'Gender',
  'Current Poison Level': 'Current Poison Level',
  'Current Radiation Level': 'Current Radiation Level',
  'Fast Metabolism':
    'Your metabolic rate is twice normal.  This means that you are much less resistant to radiation and poison, but your body heals faster.',
  Bruiser:
    'A little slower, but a little bigger.  You may not hit as often, but they will feel it when you do!  Your total action points are lowered, but your Strength is increased.',
  'Small Frame':
    "You are not quite as big as the other villagers, but that never slowed you down.  You can't carry as much, but you are more agile.",
  'One Hander':
    'One of your hands is very dominant.  You excel with single-handed weapons, but two-handed weapons cause a problem.',
  Finesse:
    "Your attacks show a lot of finesse.  You don't do as much damage, but you cause more critical hits.",
  Kamikaze:
    'By not paying attention to any threats, you can act a lot faster in a turn.  This lowers your armor class to just what you are wearing, but you sequence much faster in a combat turn.',
  'Heavy Handed':
    'You swing harder, not better.  Your attacks are very brutal, but lack finesse.  You rarely cause a good critical, but you always do more melee damage.',
  'Fast Shot':
    "You don't have time to aim for a targeted attack, because you attack faster than normal people.  It costs you one less action point for guns and thrown weapons.",
  'Bloody Mess':
    'By some strange twist of fate, people around you die violently.  You always see the worst way a person can die.',
  Jinxed:
    'The good thing is that everyone around you has more critical failures in combat, the bad thing is so do you!',
  'Good Natured':
    'You studied less-combative skills as you were growing up.  Your combat skills start at a lower level, but First Aid, Doctor, Speech and Barter are substantially improved.',
  'Chem Reliant':
    'You are more easily influenced by chems.  Your chance to be reliant by chem use is twice normal, but you recover faster from their ill effects.',
  'Chem Resistant':
    'Chems only affect you half as long as normal, but your chance to be reliant is also only 50% of normal.',
  'Sex Appeal':
    'You\'ve got the "right" stuff.  Members of the opposite sex are attracted to you, but those of the same sex tend to become quite jealous.',
  'Night Person':
    'As a night-time person, you are more awake when the sun goes down. Your Intelligence and Perception are improved at night, but dulled during the day.',
  Skilled:
    'Since you spent more time improving your skills than a normal person, you gain 5 additional skill points per experience level. The tradeoff is that you do not gain as many extra abilities. You gain a perk every four levels.',
  Gifted:
    'You have more innate abilities than most, so you have not spent as much time honing your skills.  Your primary statistics are each +1, but you lose -10% on all skills to start, and receive 5 less skill points per level.',
  'Character Points':
    'Amount of free character points that can be added to one of the basic stats.',
  'Next Level':
    'The amount of experience points needed to move up to the next level.',
  Perks:
    'Perks add additional abilities. Every third experience level, you can choose one perk.',
  Skills:
    'Skills are learned knowledge.  Skills increase by experience, or during the course of the game by special events.  The higher the skill level, the better you are at that skill.',
  'Tag Skills':
    'Tag skills are skills your character specializes in.  Each tag skill gains +20%, and increases twice as fast.  You must pick three tag skills.',
  'Optional Traits':
    'Optional traits describe your character in more detail.  All traits will have positive and negative effects.  You may choose up to two traits during creation.',
  Poisoned:
    'Your character has been poisoned.  Poison will do damage over a period of time, until cured or it passes from your system.',
  Radiated:
    'Your character is suffering from a significant amount of Radiation poisoning.  The more radiation damage, the more deadly the effect.',
  'Eye Damage':
    'This means your character has been seriously hit in one or both of your eyes.  This affects your Perception.',
  'Crippled Right Arm':
    'The right arm has been severely hurt, and cannot function well.  If one arm has been crippled, you cannot use two-handed weapons.  If both arms have been crippled, you cannot attack with weapons.',
  'Crippled Left Arm':
    "Your character's left arm has been severely hurt, and cannot function well.  If one arm has been crippled, you cannot use two-handed weapons.  If both arms have been crippled, you cannot attack with weapons.",
  'Crippled Right Leg': 'Your character has a crippled right leg.',
  'Crippled Left Leg': 'Your character has a crippled left leg.',
  Level:
    'The general competency of the player character. A measure of your experience and abilities.',
  Experience:
    'A reward for completing specific tasks, or defeating enemies in combat. More experience points are required to attain higher Levels.'

  // "Skill Points": "Use free skill points to increase the level of a skill.  As you get better at a given skill, however, it takes more points to raise that skill.  Mastering a skill can take a lot of time and effort.",
  // "Damage Threshold Laser": "Damage Threshold Laser",
  // "Damage Threshold Fire": "Damage Threshold Fire",
  // "Damage Threshold Plasma": "Damage Threshold Plasma",
  // "Damage Threshold Electrical": "Damage Threshold Electrical",
  // "Damage Threshold EMP": "Damage Threshold EMP",
  // "Damage Threshold Explosion": "Damage Threshold Explosion",
  // "Damage Resistance Laser": "Damage Resistance Laser",
  // "Damage Resistance Fire": "Damage Resistance Fire",
  // "Damage Resistance Plasma": "Damage Resistance Plasma",
  // "Damage Resistance Electrical": "Damage Resistance Electrical",
  // "Damage Resistance EMP": "Damage Resistance EMP",
  // "Damage Resistance Explosion": "Damage Resistance Explosion"
};
/* eslint-enable no-sparse-arrays */
