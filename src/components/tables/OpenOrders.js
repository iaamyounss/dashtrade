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

function createData(
  time,
  symbol,
  type,
  side,
  price,
  amount,
  filled,
  reduceOnly,
  postOnly,
  triggerConditions,
  tpSl,
  cancelAll
) {
  return {
    time,
    symbol,
    type,
    side,
    price,
    amount,
    filled,
    reduceOnly,
    postOnly,
    triggerConditions,
    tpSl,
    cancelAll,
  }
}

export default function OpenOrders() {
  const row = createData(
    '2022-02-15 14:06:37',
    'BNBUSDT Perpetual',
    'Limit',
    'Sell',
    429.0,
    '30.88 BNB',
    '0.00 BNB',
    'No',
    'No',
    '-',
    '-',
    'X'
  )

  return (
    <TableContainer component={Paper}>
      <Table
        sx={{ minWidth: 650, backgroundColor: '#222' }}
        size='small'
        aria-label='Open Orders Table'
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
            <TableCell>Time</TableCell>
            <TableCell align='left'>Symbol</TableCell>
            <TableCell align='left'>Type</TableCell>
            <TableCell align='left'>Side</TableCell>
            <TableCell align='left'>Price</TableCell>
            <TableCell align='left'>Amount</TableCell>
            <TableCell align='left'>Filled</TableCell>
            <TableCell align='left'>Reduce Only</TableCell>
            <TableCell align='left'>Post Only</TableCell>
            <TableCell align='left'>Trigger Conditions</TableCell>
            <TableCell align='left'>TP/SL</TableCell>
            <TableCell align='left'>
              Cancel All
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
              {row.time}
            </TableCell>
            <TableCell align='left'>{row.symbol}</TableCell>
            <TableCell align='left'>{row.type}</TableCell>
            <TableCell align='left'>{row.side}</TableCell>
            <TableCell align='left'>{row.price}</TableCell>
            <TableCell align='left'>{row.amount}</TableCell>
            <TableCell align='left'>{row.filled}</TableCell>
            <TableCell align='left'>{row.reduceOnly}</TableCell>
            <TableCell align='left'>{row.postOnly}</TableCell>
            <TableCell align='left'>{row.triggerConditions}</TableCell>
            <TableCell align='left'>{row.tpSl}</TableCell>
            <TableCell align='left'>{row.cancelAll}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  )
}
