import { createClient } from '@supabase/supabase-js';
import env from '../_config/env';

export const supabase = createClient(env.SUPABASE_URL, env.SUPABASE_KEY);
