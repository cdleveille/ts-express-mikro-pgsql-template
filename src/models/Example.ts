import { Entity, Property, Index } from "@mikro-orm/core";

import { Base } from "./Base";

@Entity()
export class Example extends Base {

	constructor(example?: Partial<Example>) {
		super();
		Object.assign(this, example);
	}

	@Index()
	@Property()
	example: string;
}