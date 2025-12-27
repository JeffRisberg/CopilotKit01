import {ReactNode} from "react";
import {CopilotKit} from "@copilotkit/react-core";
import "./globals.css";


export default function RootLayout({children}: { children: ReactNode }) {
   return (
      <html lang="en">
         <head>
            <title>CopilotKit01</title>
         </head>
         <body>
            <div>Example of CopilotKit</div>
            <CopilotKit
               runtimeUrl="/api/copilotkit"
               showDevConsole={false}
            >
               {children}
            </CopilotKit>
         </body>
      </html>
   );
}
