import { type SchemaTypeDefinition } from 'sanity'
import {shopItem, shopSection} from './schemaTypes/shop-items'
import { verificationToken, userType, userAccount, order } from './schemaTypes/verification-token';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [shopItem, shopSection, userType, verificationToken, userAccount, order],
}
