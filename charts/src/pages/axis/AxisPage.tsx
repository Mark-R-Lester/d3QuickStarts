import { useCallback, useEffect, useState } from "react";
import { Axiss, Canvas, createCanvas } from 'd3qs/d3QuickStart'


export default function AxisPage() {

  const createChart = useCallback( () => {
    const data1: number[] = [0, 20, 20, 30, 20, 35, 0, 20, 15, 30, 10, 50]
    const data2: string[] = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k']
    const canvas: Canvas | undefined = createCanvas('#chart', { width: 800 })
    if(canvas) {
      const axis1: Axiss = new Axiss(canvas)
      axis1.xAxisBottomBanded(data2)
      axis1.yAxisLeftBanded(data1)
    }
  }, [])

  useEffect(()=> {
    createChart()
  }, [])


  return (
    <>
      <h1>Some axes </h1>
      <div id="chart"></div>
    </>
  )
}