import { NextRequest, NextResponse } from 'next/server';

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://kkpffydweumgewhvxzow.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtrcGZmeWR3ZXVtZ2V3aHZ4em93Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTA0MjI0NTAsImV4cCI6MjAyNTk5ODQ1MH0.jGBuis_fR3_X3JzFZmmuVTjEEJve5CClGUjZco4vdsw';

const supabase = createClient(supabaseUrl, supabaseKey);

export { supabase };