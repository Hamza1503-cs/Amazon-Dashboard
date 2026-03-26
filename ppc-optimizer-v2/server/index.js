import express from 'express'
import cors from 'cors'

import { processSearchTermReport } from './engines/negationEngine.js'
import { harvestKeywords }         from './engines/harvestingEngine.js'
import { calculateSkuHealth }      from './engines/profitEngine.js'
import { getFinalGapAnalysis }     from './engines/sqpEngine.js'

import {
  sampleSearchTerms,
  sampleExistingKeywords,
  sampleSkuData,
  sampleSqpData,
  sampleTargetingData,
} from './data/sampleData.js'

const app = express()
const PORT = 3001

app.use(cors())
app.use(express.json())

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' })
})

// Negative keyword candidates — high clicks, zero orders
app.get('/api/negation', (req, res) => {
  const results = processSearchTermReport(sampleSearchTerms)
  res.json(results)
})

// POST /api/negation — supply your own search term rows
app.post('/api/negation', (req, res) => {
  const results = processSearchTermReport(req.body.searchTerms ?? [])
  res.json(results)
})

// Keyword harvest opportunities
app.get('/api/harvest', (req, res) => {
  const results = harvestKeywords(sampleSearchTerms, sampleExistingKeywords)
  res.json(results)
})

app.post('/api/harvest', (req, res) => {
  const { searchTerms = [], existingKeywords = [] } = req.body
  const results = harvestKeywords(searchTerms, existingKeywords)
  res.json(results)
})

// SKU profit health
app.get('/api/profit', (req, res) => {
  const results = calculateSkuHealth(sampleSkuData)
  res.json(results)
})

app.post('/api/profit', (req, res) => {
  const results = calculateSkuHealth(req.body.skus ?? [])
  res.json(results)
})

// SQP gap analysis
app.get('/api/sqp', (req, res) => {
  const results = getFinalGapAnalysis(sampleSqpData, sampleTargetingData)
  res.json(results)
})

app.post('/api/sqp', (req, res) => {
  const { sqpData = [], targetingData = [] } = req.body
  const results = getFinalGapAnalysis(sqpData, targetingData)
  res.json(results)
})

app.listen(PORT, () => {
  console.log(`PPC server → http://localhost:${PORT}`)
  console.log(`  GET  /api/negation`)
  console.log(`  GET  /api/harvest`)
  console.log(`  GET  /api/profit`)
  console.log(`  GET  /api/sqp`)
})
