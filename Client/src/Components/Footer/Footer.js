import React, {memo} from 'react'
import "./Footer.css"

function Footer() {
  return (
    <div className="card-footer  text-center font-weight-bolder p-4 bg-dark text-white">
      Made with &hearts; by Amit Chhipa
    </div>
  )
}
export default memo(Footer)