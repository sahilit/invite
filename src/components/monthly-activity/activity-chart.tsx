'use client'

import { motion } from 'framer-motion'
import { TxnsByMonth } from '@/atoms/user-stats'
import { getMonthFromNumber } from '@/utils'

export const ActivityChart: React.FC<{
  data: TxnsByMonth
}> = ({ data }) => {
  const txnList = Object.entries(data).map(([num, txnCount]) => {
    const month = getMonthFromNumber(num)
    return {
      month,
      txnCount
    }
  })

  const mostActiveMonth = txnList.reduce((acc, curr) =>
    acc.txnCount > curr.txnCount ? acc : curr
  )

  const axisPoints = Array.from({ length: 5 }, (_, i) => {
    const point = mostActiveMonth.txnCount / 4
    const orderOfMagnitude = Math.floor(Math.log10(point))
    const roundTo = Math.pow(10, orderOfMagnitude)
    const roundedPoint = Math.ceil(point / roundTo) * roundTo
    if (roundedPoint > point) {
      return roundedPoint * (i + 1)
    }
    return roundedPoint * i
  })

  const maxPoint = axisPoints[axisPoints.length - 1]

  return (
    <motion.div
      initial={{ opacity: 0, y: '100%' }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: '100%' }}
      transition={{
        delay: 0.75,
        damping: 20
      }}
      className="w-3/4 absolute bottom-10 z-[10] aspect-square border-2 border-[#722397] overflow-hidden rounded-2xl bg-[#F3E1FC]"
    >
      <div className="absolute z-[20] bottom-[0.625rem] left-6 h-[90%] w-[4px] bg-[#0E768D] rounded-full">
        {axisPoints.map((point, i) => (
          <motion.p
            key={i}
            transition={{
              delay: 1 + i * 0.1
            }}
            className="right-[0.5rem] absolute flex-[1] text-[#0E768D] text-[0.4rem] font-bold"
            style={{
              bottom: `calc(${(point / maxPoint) * 90}%)`
            }}
          >
            {point.toLocaleString('en-US', {
              notation: 'compact'
            })}
          </motion.p>
        ))}
      </div>
      <div className="absolute z-[20] left-[0.625rem] bottom-6 w-[90%] h-[4px] bg-[#0E768D] rounded-full" />
      <div
        className="absolute left-[1.5rem] bottom-[1.5rem] z-[10] flex items-end space-x-[6px] mx-[0.625rem]"
        style={{
          height: 'calc(90%)',
          width: 'calc(100% - 4rem)'
        }}
      >
        {txnList.map(({ month, txnCount }, i) => (
          <motion.div
            key={month.long}
            initial={{ height: 0 }}
            animate={{
              height: `${(txnCount / maxPoint) * 90}%`
            }}
            transition={{
              delay: 1 + i * 0.1
            }}
            className={`${
              mostActiveMonth.month.long === month.long
                ? 'bg-[#0E768D]'
                : 'bg-[#CB91E7CC]'
            } w-full rounded-t`}
          >
            <motion.p
              initial={{ opacity: 0, y: '100%' }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 1 + i * 0.1
              }}
              className="absolute text-[#0E768D] text-[0.4rem] font-bold"
              style={{
                bottom: '-0.8rem'
              }}
            >
              {month.short}
            </motion.p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
