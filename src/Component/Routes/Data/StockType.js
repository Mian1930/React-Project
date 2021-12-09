
import trg from '../../../Images/trg.jpeg'
import tplp from '../../../Images/stocks/tplp.png'
import epcl from '../../../Images/stocks/engro.png'
import avn from '../../../Images/stocks/avc.png'
import mebl from '../../../Images/stocks/meezan.png'
import systems from '../../../Images/stocks/systems.png'

import ablStockFund from '../../../Images/abl-stock-fund.jpg'
import ublStock from '../../../Images/ubl-fund.jpg'
import meezanFunds from '../../../Images/stocks/meezan.png'
import ablCashFunds from '../../../Images/ABL_ICF.png'

const StockTypes = {
    mutualFunds : [
        {
            title : 'ABL Stock Fund', 
            abbr : 'F042',
            imgUrl : ablStockFund
        },
        {
            title : 'UBL Stock Advantage Fund', 
            abbr : 'F096', 
            imgUrl : ublStock
        },
        {
            title : 'Meezan Mutual Fund', 
            abbr : 'F123', 
            imgUrl : meezanFunds
        },
        {
            title : 'ABL Islamic Cash Fund', 
            abbr : '217D', 
            imgUrl : ablCashFunds
        }
    ],
    stocks : [ 
        {
            title : 'Systems Limited', 
            abbr : 'SYS',
            imgUrl : systems
        },
        {
            title : 'Engro Polymer', 
            abbr : 'EPCL', 
            imgUrl : epcl 
        },
        {
            title : 'Meezan Bank', 
            abbr : 'MEBL', 
            imgUrl : mebl
        },
        {
            title : 'Avenceon', 
            abbr : 'AVN', 
            imgUrl : avn
        },
        {
            title : 'TRG', 
            abbr : 'TRG', 
            imgUrl : trg
        }
    ],
    forex : [],
    kibor : [],
    nationalSavings : [],
}

export default StockTypes