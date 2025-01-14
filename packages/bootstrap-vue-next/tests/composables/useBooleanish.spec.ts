import {useBooleanish} from '../../src/composables'
import {describe, expect, it} from 'vitest'
import {reactive} from 'vue'
import type {Booleanish} from '../../src/types'

describe('useBooleanish blackbox test', () => {
  // To try to ensure it is ComputedRef
  it('value to contain property value', () => {
    const prop = {value: 'false' as Booleanish}
    const value = useBooleanish(() => prop.value)
    expect(value).toHaveProperty('value')
  })

  it("value to return bool false, when 'false'", () => {
    const prop = {value: 'false' as Booleanish}
    const value = useBooleanish(() => prop.value)
    expect(value.value).toBe(false)
  })

  it('value to return bool false, when false', () => {
    const prop = {value: false as Booleanish}
    const value = useBooleanish(() => prop.value)
    expect(value.value).toBe(false)
  })

  it("value to return bool true, when 'true'", () => {
    const prop = {value: 'true' as Booleanish}
    const value = useBooleanish(() => prop.value)
    expect(value.value).toBe(true)
  })

  it('value to return bool true, when true', () => {
    const prop = {value: 'false' as Booleanish}
    const value = useBooleanish(() => prop.value)
    expect(value.value).toBe(false)
  })

  it('value to return bool true, when empty string', () => {
    const prop = {value: '' as Booleanish}
    const value = useBooleanish(() => prop.value)
    expect(value.value).toBe(true)
  })

  it('return value to be reactive', () => {
    const prop = reactive<{value: Booleanish}>({value: false})
    const value = useBooleanish(() => prop.value)
    expect(value.value).toBe(false)
    prop.value = true
    expect(value.value).toBe(true)
    prop.value = 'false'
    expect(value.value).toBe(false)
    prop.value = ''
    expect(value.value).toBe(true)
    prop.value = false
    expect(value.value).toBe(false)
  })

  it('returns value undefined when undefined', () => {
    const prop = reactive<{value: Booleanish | undefined}>({value: undefined})
    const value = useBooleanish(() => prop.value)
    expect(value.value).toBeUndefined()
  })
})
