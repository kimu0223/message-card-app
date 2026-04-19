'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Loader2, FileImage, FileText } from 'lucide-react'
import { toast } from 'sonner'
import { exportToPNG, exportToPDF } from '@/lib/canvas/exporter'

interface ExportPanelProps {
  targetElementId: string
  filename?: string
}

export default function ExportPanel({ targetElementId, filename = 'card' }: ExportPanelProps) {
  const [isPNGLoading, setIsPNGLoading] = useState(false)
  const [isPDFLoading, setIsPDFLoading] = useState(false)

  const handleExportPNG = async () => {
    setIsPNGLoading(true)
    try {
      await exportToPNG(targetElementId, filename)
      toast.success('PNG でダウンロードしました')
    } catch {
      toast.error('エクスポートに失敗しました')
    } finally {
      setIsPNGLoading(false)
    }
  }

  const handleExportPDF = async () => {
    setIsPDFLoading(true)
    try {
      await exportToPDF(targetElementId, filename)
      toast.success('PDF でダウンロードしました')
    } catch {
      toast.error('エクスポートに失敗しました')
    } finally {
      setIsPDFLoading(false)
    }
  }

  return (
    <div className="space-y-3">
      <Button
        onClick={handleExportPNG}
        disabled={isPNGLoading}
        variant="outline"
        className="w-full justify-start"
      >
        {isPNGLoading ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <FileImage className="mr-2 h-4 w-4" />
        )}
        PNG でダウンロード
      </Button>

      <Button
        onClick={handleExportPDF}
        disabled={isPDFLoading}
        variant="outline"
        className="w-full justify-start"
      >
        {isPDFLoading ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <FileText className="mr-2 h-4 w-4" />
        )}
        PDF でダウンロード
      </Button>
    </div>
  )
}
