export enum Special {
	Strength = 'Strength',
	Perception = 'Perception',
	Endurance = 'Endurance',
	Charimsa = 'Charisma',
	Intelligence = 'Intelligence',
	Agility = 'Agility',
	Luck = 'Luck'
}

export function SpecialAbbreviation(special: Special): string {
	switch (special) {
		case Special.Strength:
			return 'ST';
		case Special.Perception:
			return 'PE';
		case Special.Endurance:
			return 'EN';
		case Special.Charimsa:
			return 'CH';
		case Special.Intelligence:
			return 'IN';
		case Special.Agility:
			return 'AG';
		case Special.Luck:
			return 'LK';
	}
}

export type Attributes = Map<Special, number>;

export enum CombatSkills {
	SmallGuns = 'Small Guns',
	BigGuns = 'Big Guns',
	EnergyWeapons = 'Energy Weapons',
	Unarmed = 'Unarmed',
	MeleeWeapons = 'Melee Weapons',
	Throwing = 'Throwing'
}

export enum ActiveSkills {
	FirstAid = 'First Aid',
	Doctor = 'Doctor',
	Sneak = 'Sneak',
	LockPick = 'Lockpick',
	Steal = 'Steal',
	Traps = 'Traps',
	Science = 'Science',
	Repair = 'Repair'
}

export enum PassiveSkills {
	Speech = 'Speech',
	Barder = 'Barter',
	Gambling = 'Gambling',
	Outdoorsman = 'Outdoorsman'
}

export const Skills = { ...CombatSkills, ...ActiveSkills, ...PassiveSkills };
export type Skills = typeof Skills;
export type SkillSet = Map<Skills, number>;
