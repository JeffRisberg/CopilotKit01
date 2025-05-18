import {ReactNode} from "react";
import dotenv from 'dotenv';
import {CopilotKit} from "@copilotkit/react-core";
import "./globals.css";

dotenv.config();

export default function RootLayout({children}: { children: ReactNode }) {
   return (
      <html lang="en">
         <head>
            <title>CopilotKit 01</title>
         </head>
         <body>
            <div>Example of Copilot Kit</div>
            <CopilotKit publicApiKey={process.env.COPILOTKEY_API_KEY}>
               {children}
            </CopilotKit>
         </body>
      </html>
   );
}
