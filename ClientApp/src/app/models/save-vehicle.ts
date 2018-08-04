import { KeyValuePair } from "./key-value-pair";
import { Contact } from "./contact";

export interface SaveVehicle {
    id: number;
    modelId: number;
    makeId: number;
    isRegistered: boolean;
    features: number[];
    contact: Contact;
}