import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
//import FormControl from '@mui/material/FormControl'
//import InputLabel from '@mui/material/InputLabel'
//import MenuItem from '@mui/material/MenuItem'
//import Select from '@mui/material/Select'
import { useTabs } from 'context/utils/TabsContext'

function createData(
  time,
  symbol,
  type,
  side,
  average,
  price,
  executed,
  amount,
  reduceOnly,
  postOnly,
  triggerConditions,
  status
) {
  return {
    time,
    symbol,
    type,
    side,
    average,
    price,
    executed,
    amount,
    reduceOnly,
    postOnly,
    triggerConditions,
    status,
  }
}

export default function OrderHistory() {
  const { selectedOrdersTabId } = useTabs()

  const dayRow = createData(
    '2022-02-15 13:59:31',
    'BNBUSDT Perpetual',
    'Limit',
    'Buy',
    427.891,
    428.272,
    '35.02 BNB',
    '35.02 BNB',
    'No',
    'No',
    '-',
    'Filled'
  )
  const weekRow = createData(
    '2022-02-15 2022-02-22',
    'BNBUSDT Perpetual',
    'Limit',
    'Buy',
    427.891,
    428.272,
    '35.02 BNB',
    '35.02 BNB',
    'No',
    'No',
    '-',
    'Filled'
  )
  const monthRow = createData(
    '2022-02-15 2022-03-15',
    'BNBUSDT Perpetual',
    'Limit',
    'Buy',
    427.891,
    428.272,
    '35.02 BNB',
    '35.02 BNB',
    'No',
    'No',
    '-',
    'Filled'
  )
  const threeMonthsRow = createData(
    '2022-02-15 2022-05-15',
    'BNBUSDT Perpetual',
    'Limit',
    'Buy',
    427.891,
    428.272,
    '35.02 BNB',
    '35.02 BNB',
    'No',
    'No',
    '-',
    'Filled'
  )
  let row = dayRow

  switch (selectedOrdersTabId) {
    case 0:
      row = dayRow
      break
    case 1:
      row = weekRow
      break
    case 2:
      row = monthRow
      break
    case 3:
      row = threeMonthsRow
      break
    default:
      break
  }

  return (
    <>
      <TableContainer component={Paper}>
        <Table
          sx={{ minWidth: 650, backgroundColor: '#222' }}
          size='small'
          aria-label='Order History Table'
        >
          <TableHead>
            <TableRow
              sx={{
                '&:last-child td, &:last-child th': {
                  borderBottom: '1px solid #444',
                  color: '#999',
                },
              }}
            >
              <TableCell></TableCell>
              <TableCell align='left'>Time</TableCell>
              <TableCell align='left'>Symbol</TableCell>
              <TableCell align='left'>Type</TableCell>
              <TableCell align='left'>Side</TableCell>
              <TableCell align='left'>Average</TableCell>
              <TableCell align='left'>Price</TableCell>
              <TableCell align='left'>Executed</TableCell>
              <TableCell align='left'>Amount</TableCell>
              <TableCell align='left'>Reduce Only</TableCell>
              <TableCell align='left'>Post Only</TableCell>
              <TableCell align='left'>Trigger Conditions</TableCell>
              <TableCell align='left'>
                Status
                {/* <InputLabel id='demo-simple-select-label'></InputLabel>
              <Select
                labelId='demo-simple-select-label'
                id='demo-simple-select'
                value={''}
                label='Cancel All'
                //   onChange={handleChange}
                >
                <MenuItem value={'Cancel All'}>Cancel All</MenuItem>
              </Select> */}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow
              sx={{
                '&:last-child td, &:last-child th': {
                  borderBottom: '1px solid #444',
                  color: '#999',
                },
              }}
            >
              <TableCell component='th' scope='row'>
                +
              </TableCell>
              <TableCell align='left'>{row.time}</TableCell>
              <TableCell align='left'>{row.symbol}</TableCell>
              <TableCell align='left'>{row.type}</TableCell>
              <TableCell align='left'>{row.side}</TableCell>
              <TableCell align='left'>{row.average}</TableCell>
              <TableCell align='left'>{row.price}</TableCell>
              <TableCell align='left'>{row.executed}</TableCell>
              <TableCell align='left'>{row.amount}</TableCell>
              <TableCell align='left'>{row.reduceOnly}</TableCell>
              <TableCell align='left'>{row.postOnly}</TableCell>
              <TableCell align='left'>{row.triggerConditions}</TableCell>
              <TableCell align='left'>{row.status}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}
