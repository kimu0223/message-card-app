'use client'

import { useRef, useEffect, useState } from 'react'
import { Stage, Layer, Text, Rect, Ellipse, Star, Shape, Transformer } from 'react-konva'
import type Konva from 'konva'
import type { KonvaEventObject } from 'konva/lib/Node'
import { CARD_SIZES } from '@/types/card'
import type { CanvasData, CanvasElement, TextElement, ShapeElement } from '@/types/card'
import { CARD_TEMPLATES } from '@/components/lp/CardTemplates'

interface CardCanvasProps {
  canvasData: CanvasData
  selectedElementId: string | null
  zoom: number
  onElementSelect: (id: string | null) => void
  onElementChange: (id: string, updates: Partial<CanvasElement>) => void
}

export default function CardCanvas({
  canvasData,
  selectedElementId,
  zoom,
  onElementSelect,
  onElementChange,
}: CardCanvasProps) {
  const transformerRef = useRef<Konva.Transformer>(null)
  const stageRef = useRef<Konva.Stage>(null)
  const [editingId, setEditingId] = useState<string | null>(null)

  const sizeConfig = CARD_SIZES[canvasData.size]
  const stageWidth = sizeConfig.width * zoom
  const stageHeight = sizeConfig.height * zoom

  const bg = canvasData.background
  const templateDef = canvasData.templateId
    ? CARD_TEMPLATES.find(t => t.id === canvasData.templateId)
    : null
  const bgStyle: React.CSSProperties = templateDef
    ? {}
    : bg.type === 'gradient' ? { background: bg.value } : { backgroundColor: bg.value }

  useEffect(() => {
    if (!transformerRef.current || !stageRef.current) return
    const stage = stageRef.current
    if (selectedElementId) {
      const node = stage.findOne(`#${selectedElementId}`)
      if (node) {
        transformerRef.current.nodes([node as Konva.Node])
      } else {
        transformerRef.current.nodes([])
      }
    } else {
      transformerRef.current.nodes([])
    }
    transformerRef.current.getLayer()?.batchDraw()
  }, [selectedElementId, canvasData.elements])

  const handleDeselect = () => {
    onElementSelect(null)
  }

  const handleDragEnd = (id: string, e: KonvaEventObject<DragEvent>) => {
    onElementChange(id, {
      x: Math.round(e.target.x() + e.target.width() / 2),
      y: Math.round(e.target.y() + e.target.height() / 2),
    })
  }

  const handleTransformEnd = (id: string, e: KonvaEventObject<Event>) => {
    onElementChange(id, {
      x: Math.round(e.target.x()),
      y: Math.round(e.target.y()),
      rotation: Math.round(e.target.rotation()),
    })
  }

  const sortedElements = [...canvasData.elements].sort((a, b) => a.zIndex - b.zIndex)

  return (
    <div className="relative shadow-xl" style={{ width: stageWidth, height: stageHeight, ...bgStyle }}>
      {templateDef && (
        <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
          <templateDef.Comp />
        </div>
      )}
      <Stage
        ref={stageRef}
        width={stageWidth}
        height={stageHeight}
        scaleX={zoom}
        scaleY={zoom}
        onClick={handleDeselect}
        style={{ position: 'absolute', top: 0, left: 0 }}
      >
        <Layer>
          <Rect
            id="bg-rect"
            x={0}
            y={0}
            width={sizeConfig.width}
            height={sizeConfig.height}
            fill="transparent"
            onClick={handleDeselect}
          />

          {sortedElements.map(el => {
            if (el.type === 'shape') {
              const shapeEl = el as ShapeElement
              const strokeVal = shapeEl.stroke === 'transparent' ? '' : shapeEl.stroke
              const commonDrag = {
                draggable: true,
                onClick: (e: KonvaEventObject<MouseEvent>) => { e.cancelBubble = true; onElementSelect(el.id) },
                onDragEnd: (e: KonvaEventObject<DragEvent>) => handleDragEnd(el.id, e),
                onTransformEnd: (e: KonvaEventObject<Event>) => handleTransformEnd(el.id, e),
              }
              if (shapeEl.shapeType === 'rect') {
                return (
                  <Rect
                    key={el.id} id={el.id}
                    x={shapeEl.x - shapeEl.width / 2} y={shapeEl.y - shapeEl.height / 2}
                    width={shapeEl.width} height={shapeEl.height}
                    rotation={shapeEl.rotation} opacity={shapeEl.opacity}
                    fill={shapeEl.fill} stroke={strokeVal} strokeWidth={shapeEl.strokeWidth}
                    cornerRadius={3}
                    {...commonDrag}
                  />
                )
              }
              if (shapeEl.shapeType === 'circle') {
                return (
                  <Ellipse
                    key={el.id} id={el.id}
                    x={shapeEl.x} y={shapeEl.y}
                    radiusX={shapeEl.width / 2} radiusY={shapeEl.height / 2}
                    rotation={shapeEl.rotation} opacity={shapeEl.opacity}
                    fill={shapeEl.fill} stroke={strokeVal} strokeWidth={shapeEl.strokeWidth}
                    {...commonDrag}
                  />
                )
              }
              if (shapeEl.shapeType === 'heart') {
                return (
                  <Shape
                    key={el.id} id={el.id}
                    x={shapeEl.x - shapeEl.width / 2} y={shapeEl.y - shapeEl.height / 2}
                    width={shapeEl.width} height={shapeEl.height}
                    rotation={shapeEl.rotation} opacity={shapeEl.opacity}
                    fill={shapeEl.fill} stroke={strokeVal} strokeWidth={shapeEl.strokeWidth}
                    sceneFunc={(ctx, shape) => {
                      const w = shape.width()
                      const h = shape.height()
                      ctx.beginPath()
                      ctx.moveTo(w / 2, h * 0.85)
                      ctx.bezierCurveTo(w * -0.1, h * 0.55, w * -0.15, h * 0.05, w / 2, h * 0.22)
                      ctx.bezierCurveTo(w * 1.15, h * 0.05, w * 1.1, h * 0.55, w / 2, h * 0.85)
                      ctx.closePath()
                      ctx.fillStrokeShape(shape)
                    }}
                    {...commonDrag}
                  />
                )
              }
              if (shapeEl.shapeType === 'star') {
                return (
                  <Star
                    key={el.id} id={el.id}
                    x={shapeEl.x} y={shapeEl.y}
                    numPoints={5}
                    innerRadius={Math.min(shapeEl.width, shapeEl.height) * 0.2}
                    outerRadius={Math.min(shapeEl.width, shapeEl.height) * 0.5}
                    rotation={shapeEl.rotation} opacity={shapeEl.opacity}
                    fill={shapeEl.fill} stroke={strokeVal} strokeWidth={shapeEl.strokeWidth}
                    {...commonDrag}
                  />
                )
              }
              return null
            }

            if (el.type !== 'text') return null
            const textEl = el as TextElement
            if (editingId === el.id) return null

            return (
              <Text
                key={el.id}
                id={el.id}
                x={textEl.x - textEl.width / 2}
                y={textEl.y - textEl.height / 2}
                width={textEl.width}
                text={textEl.text}
                fontFamily={textEl.fontFamily}
                fontSize={textEl.fontSize}
                fontStyle={`${textEl.fontStyle} ${textEl.fontWeight}`}
                fill={textEl.color}
                align={textEl.align}
                lineHeight={textEl.lineHeight}
                opacity={textEl.opacity}
                rotation={textEl.rotation}
                draggable
                onClick={(e) => { e.cancelBubble = true; onElementSelect(el.id) }}
                onDblClick={() => setEditingId(el.id)}
                onDragEnd={(e) => handleDragEnd(el.id, e)}
                onTransformEnd={(e) => handleTransformEnd(el.id, e)}
              />
            )
          })}

          <Transformer
            ref={transformerRef}
            enabledAnchors={['middle-left', 'middle-right', 'top-center', 'bottom-center']}
            boundBoxFunc={(oldBox, newBox) => {
              if (newBox.width < 20 || newBox.height < 20) return oldBox
              return newBox
            }}
          />
        </Layer>
      </Stage>

      {/* インライン編集オーバーレイ */}
      {editingId && (() => {
        const el = canvasData.elements.find(e => e.id === editingId)
        if (!el || el.type !== 'text') return null
        const textEl = el as TextElement
        return (
          <textarea
            autoFocus
            className="absolute resize-none bg-transparent outline-none"
            style={{
              left: (textEl.x - textEl.width / 2) * zoom,
              top: (textEl.y - textEl.height / 2) * zoom,
              width: textEl.width * zoom,
              minHeight: textEl.height * zoom,
              fontSize: textEl.fontSize * zoom,
              fontFamily: textEl.fontFamily,
              fontWeight: textEl.fontWeight,
              fontStyle: textEl.fontStyle,
              color: textEl.color,
              textAlign: textEl.align,
              lineHeight: String(textEl.lineHeight),
              border: '2px dashed rgba(99,102,241,0.6)',
              padding: '2px',
            }}
            value={textEl.text}
            onChange={e => onElementChange(editingId, { text: e.target.value })}
            onBlur={() => setEditingId(null)}
          />
        )
      })()}
    </div>
  )
}
