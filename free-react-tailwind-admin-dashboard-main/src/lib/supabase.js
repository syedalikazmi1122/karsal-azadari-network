import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://jqqvrvzgrxalinzxodml.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpxcXZydnpncnhhbGluenhvZG1sIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUwNDc0MTIsImV4cCI6MjA2MDYyMzQxMn0.0dj8gvkurZHkJbdlczz4eS-PGaQOsfBUFZNvLqIrORg'

export const supabase = createClient(supabaseUrl, supabaseAnonKey) 