'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [displayChildren, setDisplayChildren] = useState(children)
  const [transitionStage, setTransitionStage] = useState('fadeIn')

  useEffect(() => {
    setTransitionStage('fadeOut')
    const timer = setTimeout(() => {
      setDisplayChildren(children)
      setTransitionStage('fadeIn')
    }, 300)

    return () => clearTimeout(timer)
  }, [pathname, children])

  return (
    <div
      style={{
        animation: transitionStage === 'fadeIn' 
          ? 'pageZoomIn 0.5s cubic-bezier(0.32, 0.72, 0, 1) forwards'
          : 'pageZoomOut 0.3s cubic-bezier(0.32, 0.72, 0, 1) forwards',
      }}
    >
      {displayChildren}
      <style jsx global>{`
        @keyframes pageZoomIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes pageZoomOut {
          from {
            opacity: 1;
            transform: scale(1);
          }
          to {
            opacity: 0;
            transform: scale(1.05);
          }
        }
      `}</style>
    </div>
  )
}
