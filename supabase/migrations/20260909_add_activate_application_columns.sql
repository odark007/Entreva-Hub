-- ACTIVATE by Entreva Hub application form fields.
-- Run these statements against the registrations table in Supabase.
-- Existing columns used by other forms are left untouched.

ALTER TABLE registrations
  ADD COLUMN IF NOT EXISTS first_name text,
  ADD COLUMN IF NOT EXISTS surname text,
  ADD COLUMN IF NOT EXISTS sex text,
  ADD COLUMN IF NOT EXISTS contact_1 text,
  ADD COLUMN IF NOT EXISTS contact_2 text,
  ADD COLUMN IF NOT EXISTS guardian_name text,
  ADD COLUMN IF NOT EXISTS guardian_contact text,
  ADD COLUMN IF NOT EXISTS community text,
  ADD COLUMN IF NOT EXISTS region text,
  ADD COLUMN IF NOT EXISTS employment_status text,
  ADD COLUMN IF NOT EXISTS marital_status text,
  ADD COLUMN IF NOT EXISTS can_attend_full_duration text,
  ADD COLUMN IF NOT EXISTS is_pwd text,
  ADD COLUMN IF NOT EXISTS disability_types text[] DEFAULT '{}'::text[],
  ADD COLUMN IF NOT EXISTS hear_about text,
  ADD COLUMN IF NOT EXISTS has_ghana_card text,
  ADD COLUMN IF NOT EXISTS is_refugee text,
  ADD COLUMN IF NOT EXISTS is_idp text;

-- Relax Future Force-specific NOT NULL constraints so ACTIVATE (and other
-- programmes without compulsory guardian data) can submit. Future Force rows
-- still always fill these columns, so this is non-breaking.
ALTER TABLE registrations
  ALTER COLUMN parent_full_name DROP NOT NULL,
  ALTER COLUMN parent_relationship DROP NOT NULL,
  ALTER COLUMN parent_phone DROP NOT NULL,
  ALTER COLUMN parent_email DROP NOT NULL,
  ALTER COLUMN education_level DROP NOT NULL;

-- The form reuses these existing columns for ACTIVATE rows:
--   program            = 'activate'
--   status             = 'new'
--   payment_status     = 'pending'
--   student_full_name  = "<first_name> <surname>" (so admin views keep working)
--   student_dob        = date of birth
--   student_email      = email (optional)
--   education_level    = highest level of education (optional)