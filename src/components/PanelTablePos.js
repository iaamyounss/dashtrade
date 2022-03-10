import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'

function createData(
  symbol,
  size,
  entryPrice,
  markPrice,
  liqPrice,
  marginRatio,
  margin,
  pnl,
  closeAllPositions,
  tpSlForPosition
) {
  return {
    symbol,
    size,
    entryPrice,
    markPrice,
    liqPrice,
    marginRatio,
    margin,
    pnl,
    closeAllPositions,
    tpSlForPosition,
  }
}

export default function PositionsTable() {
  const row = createData(
    'BNBUSDT Perpetual',
    '35.02 BNB',
    427.891,
    428.607,
    '--',
    '0.12%',
    '750.49 USDT (Cross)',
    '+27.42 USDT (+3.65%)',
    'Market/Limit',
    'X'
  )

  return (
    <TableContainer component={Paper}>
      <Table
        sx={{ minWidth: 650, backgroundColor: '#222' }}
        size='small'
        aria-label='Positions Table'
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
            <TableCell>Symbol</TableCell>
            <TableCell align='left'>Size</TableCell>
            <TableCell align='left'>Entry Price</TableCell>
            <TableCell align='left'>Mark Price</TableCell>
            <TableCell align='left'>Liq. Price</TableCell>
            <TableCell align='left'>Margin Ratio</TableCell>
            <TableCell align='left'>Margin</TableCell>
            <TableCell align='left'>PNL(ROE %)</TableCell>
            <TableCell align='left'>Close All Positions</TableCell>
            <TableCell align='left'>TP/SL for position</TableCell>
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
              {row.symbol}
            </TableCell>
            <TableCell align='left'>{row.size}</TableCell>
            <TableCell align='left'>{row.entryPrice}</TableCell>
            <TableCell align='left'>{row.markPrice}</TableCell>
            <TableCell align='left'>{row.liqPrice}</TableCell>
            <TableCell align='left'>{row.marginRatio}</TableCell>
            <TableCell align='left'>{row.margin}</TableCell>
            <TableCell align='left'>{row.pnl}</TableCell>
            <TableCell align='left'>{row.closeAllPositions}</TableCell>
            <TableCell align='left'>
              <i className='fa-solid fa-pen-to-square'></i>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  )
}
