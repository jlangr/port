import { createHistogramFromMarkdownFile } from '../src/createHistogram.mjs'
import { writeFile, unlink } from 'node:fs/promises'

describe('createHistogramFromMarkdownFile', () => {
  const filePath = 'test.md'

  const write = content =>
    writeFile(filePath, content)

  const remove = () =>
    unlink(filePath)

  afterEach(async () => remove())

  it('cleans punctuation', async () => {
    await write('Hello, world! Hello? world.')
    const result = await createHistogramFromMarkdownFile(filePath)
    expect(result).toEqual([
      ['hello', 2],
      ['world', 2]
    ])
  })

  it('ignores case differences', async () => {
    await write('Apple apple APPLE banana')
    const result = await createHistogramFromMarkdownFile(filePath)
    expect(result).toEqual([
      ['apple', 3],
      ['banana', 1]
    ])
  })

  it('filters stopwords', async () => {
    await write('the and to with under')
    const result = await createHistogramFromMarkdownFile(filePath)
    expect(result).toEqual([])
  })

  it('sorts descending', async () => {
    await write('cat dog dog bird bird bird')
    const result = await createHistogramFromMarkdownFile(filePath)
    expect(result).toEqual([
      ['bird', 3],
      ['dog', 2],
      ['cat', 1]
    ])
  })

  it('stable sort on tie', async () => {
    await write('fox fox bear bear cat')
    const result = await createHistogramFromMarkdownFile(filePath)
    expect(result).toEqual([
      ['fox', 2],
      ['bear', 2],
      ['cat', 1]
    ])
  })

  it('handles empty input', async () => {
    await write('   ')
    const result = await createHistogramFromMarkdownFile(filePath)
    expect(result).toEqual([])
  })

  it('only stopwords input', async () => {
    await write('the the the and and')
    const result = await createHistogramFromMarkdownFile(filePath)
    expect(result).toEqual([])
  })

  it('ignores numbers', async () => {
    await write('test 123 test 456')
    const result = await createHistogramFromMarkdownFile(filePath)
    expect(result).toEqual([
      ['test', 2]
    ])
  })

  it('generates histogram ignoring top 100 English words', async () => {
    await write('Row row row your boat gently underground the boat stream')
    const result = await createHistogramFromMarkdownFile(filePath)
    expect(result).toEqual([
      ['row', 3],
      ['boat', 2],
      ['gently', 1],
      ['underground', 1],
      ['stream', 1]
    ])
  })
})
