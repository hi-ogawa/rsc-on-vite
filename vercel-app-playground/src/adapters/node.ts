import { handler } from '../entry-server';
import { webToNodeHandler } from '@hiogawa/utils-node';

export default webToNodeHandler(handler);
