import { readFile } from 'node:fs/promises'

const getStopWords = () =>
  new Set([
    'the','be','to','of','and','a','in','that','have','i','it','for','not','on','with','he','as','you','do','at','this',
    'but','his','by','from','they','we','say','her','she','or','an','will','my','one','all','would','there','their',
    'what','so','up','out','if','about','who','get','which','go','me','when','make','can','like','time','no','just',
    'him','know','take','people','into','year','your','good','some','could','them','see','other','than','then','now',
    'look','only','come','its','over','think','also','back','after','use','two','how','our','work','first','well',
    'way','even','new','want','because','any','these','give','day','most','us'
  ])

const normalizeWord = word =>
  word.toLowerCase().replace(/[^a-z]/g, '')

const getWordCounts = text =>
  text
    .split(/\s+/)
    .map(normalizeWord)
    .filter(word => word.length > 0 && !getStopWords().has(word))
    .reduce((acc, word) =>
      acc.set(word, (acc.get(word) ?? 0) + 1), new Map())

const sortWordCounts = wordCounts =>
  Array.from(wordCounts.entries())
    .sort((a, b) => b[1] - a[1])

export const createHistogramFromMarkdownFile = async filePath =>
  readFile(filePath, 'utf8')
    .then(getWordCounts)
    .then(sortWordCounts)
