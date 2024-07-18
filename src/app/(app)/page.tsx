import Slot from '@/components/Slot/Slot'
import Link from 'next/link'
import React from 'react'

const Page = () => {
  return (
    <>
      <main>
        <header>
          <h1>Gear Kitting Tool</h1>
          <div className={'formControl'}>
            <input type="text" />
            <button type="submit">Share Kit</button>
          </div>
        </header>
        <Slot item={{ slot: 'primaryWeapon' }} slotted={true} />
        <br></br>
        <Slot item={{ slot: 'head' }} />
        <br></br>
        <Slot item={{ slot: 'chest' }} />
        <br></br>
        <Slot item={{ slot: 'utility' }} />
        <br></br>
        <Slot item={{ slot: 'ring' }} />
      </main>
    </>
  )
}

export default Page
