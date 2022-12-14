import test from 'tape'
import spacetime from './lib/index.js'
const useOldTz = require('./lib/useOldTz')

// Nov 1 @ 2am
test('day-dst', (t) => {
  // (sunday)
  let d = spacetime('2020-11-01T00:00:00', 'America/Chicago')
  d = useOldTz(d)
  t.equal(d.format('{day}'), 'Sunday', 'set day init')
  d = d.day('monday')
  t.equal(d.format('{day}'), 'Monday', 'set day -fwd')
  // (sunday again)
  d = spacetime('2020-11-01T04:00:00', 'America/Chicago')
  d = useOldTz(d)
  d = d.day('saturday')
  t.equal(d.format('{day}'), 'Saturday', 'set day -bkwd')
  t.end()
})

test('hour-dst', (t) => {
  let d = spacetime('2020-11-01T00:01:00', 'America/Chicago')
  d = useOldTz(d)
  t.equal(d.format('{time}'), '12:01am', 'set init hour')
  d = d.hour(5)
  t.equal(d.format('{time}'), '5:01am', 'set new hour - fwd')
  d = d.hour(1)
  t.equal(d.format('{time}'), '1:01am', 'set new hour - backwd')
  t.end()
})

test('time-dst', (t) => {
  let d = spacetime('2020-11-01T00:40:00', 'America/Chicago')
  d = useOldTz(d)
  t.equal(d.format('{time}'), '12:40am', 'set init time')
  d = d.time('5:20am')
  t.equal(d.format('{time}'), '5:20am', 'set new time - fwd')
  d = d.time('1:20am')
  t.equal(d.format('{time}'), '1:20am', 'set new time - backwd')
  t.end()
})

test('date-dst', (t) => {
  let d = spacetime('2020-11-01T01:40:00', 'America/Chicago')
  d = useOldTz(d)
  t.equal(d.format('iso-short'), '2020-11-01', 'set init date')
  d = d.date(2)
  t.equal(d.format('iso-short'), '2020-11-02', 'set new date - fwd')
  d = d.date(1)
  t.equal(d.format('iso-short'), '2020-11-01', 'set new date - backwd')
  t.end()
})

test('month-dst', (t) => {
  let d = spacetime('2020-11-01T01:40:00', 'America/Chicago')
  d = useOldTz(d)
  t.equal(d.format('iso-short'), '2020-11-01', 'set init month')
  d = d.month('dec')
  t.equal(d.format('iso-short'), '2020-12-01', 'set new month - fwd')
  d = d.month('nov')
  t.equal(d.format('iso-short'), '2020-11-01', 'set new month - backwd')
  t.end()
})

test('dayOfYear-dst', (t) => {
  let d = spacetime('2020-11-01T01:40:00', 'America/Chicago')
  d = useOldTz(d)
  t.equal(d.dayOfYear(), 306, 'set init dayOfYear')
  d = d.dayOfYear(307)
  t.equal(d.dayOfYear(), 307, 'set new dayOfYear - fwd')
  d = d.dayOfYear(306)
  t.equal(d.dayOfYear(), 306, 'set new dayOfYear - backwd')
  t.end()
})

// -5hrs -> -6hrs
test('start-end-dst', (t) => {
  let d = spacetime('2020-11-01T00:00:00', 'America/Chicago')
  d = useOldTz(d)
  t.equal(d.iso(), '2020-11-01T00:00:00.000-05:00', 'set init iso')
  d = d.endOf('day')
  t.equal(d.iso(), '2020-11-01T23:59:59.999-06:00', 'end of day - backwd')
  d = d.startOf('day')
  t.equal(d.iso(), '2020-11-01T00:00:00.000-05:00', 'start of day - fwd')
  t.end()
})
