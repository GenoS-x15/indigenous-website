import { en, type Dict } from "./en";
import { hi } from "./hi";
import { mr } from "./mr";
import type { LangCode } from "../site";

export const DICTS: Record<LangCode, Dict> = { en, hi, mr };
export type { Dict };
