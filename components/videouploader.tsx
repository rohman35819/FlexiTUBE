

import { useState } from 'react'
import { supabase } from '@/lib/supabaseClient'

export default function CreateVideoForm() {
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const { error } = await supabase.from('videos').insert([{ title, url }])
    if (error) {
      alert('Gagal menyimpan data')
      console.error(error)
    } else {
      alert('Video berhasil disimpan')
      setTitle('')
      setUrl('')
    }

    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-gray-900 text-white space-y-4">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Judul video"
        className="w-full bg-black border border-gray-700 px-3 py-2"
      />
      <input
        type="text"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="URL video"
        className="w-full bg-black border border-gray-700 px-3 py-2"
      />
      <button type="submit" disabled={loading} className="bg-blue-600 px-4 py-2">
        {loading ? 'Menyimpan...' : 'Simpan Video'}
      </button>
    </form>
  )
}
