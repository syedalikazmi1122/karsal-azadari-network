import { supabase } from '../lib/supabase'

export const uploadImage = async (file) => {
  try {
    // Generate a unique filename
    const fileExt = file.name.split('.').pop()
    const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`
    const filePath = `images/${fileName}`

    // Upload the file to Supabase storage
    const { data, error } = await supabase.storage
      .from('images')
      .upload(filePath, file)

    if (error) {
      throw error
    }

    // Get the public URL
    const { data: { publicUrl } } = supabase.storage
      .from('images')
      .getPublicUrl(filePath)

    return publicUrl
  } catch (error) {
    console.error('Error uploading image:', error)
    throw error
  }
} 