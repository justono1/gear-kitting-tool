import ClassLayout from '@/components/ClassLayout/ClassLayout'
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
        <ClassLayout />
      </main>
    </>
  )
}

export default Page
