export type Operator = "+" | "-" | "*" | "/";

export interface Operation {
	operator: Operator;
	operand1: number;
	operand2: number;
}
