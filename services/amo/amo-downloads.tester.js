'use strict'

const { ServiceTester } = require('../tester')
const { isMetricOverTimePeriod } = require('../test-validators')
const t = (module.exports = new ServiceTester({ id: 'amo', title: 'AMO' }))

t.create('Weekly Downloads')
  .get('/dw/IndieGala-Helper.json')
  .expectBadge({ label: 'downloads', message: isMetricOverTimePeriod })

t.create('Weekly Downloads (not found)')
  .get('/dw/not-a-real-plugin.json')
  .expectBadge({ label: 'downloads', message: 'not found' })

t.create('/d URL should redirect to /dw')
  .get('/d/IndieGala-Helper.json')
  .expectBadge({ label: 'downloads', message: isMetricOverTimePeriod })
