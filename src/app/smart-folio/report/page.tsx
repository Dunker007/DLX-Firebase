
"use client"

import * as React from "react"
import { FileText, Download, Calendar, ArrowRight, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useCollection, useFirestore, useUser, useMemoFirebase } from "@/firebase"
import { collection, query, orderBy } from "firebase/firestore"

export default function PortfolioReportPage() {
  const { user } = useUser()
  const db = useFirestore()
  
  const reportsQuery = useMemoFirebase(() => {
    if (!db || !user) return null;
    return query(collection(db, 'users', user.uid, 'smart_folio_reports'), orderBy('createdAt', 'desc'));
  }, [db, user]);

  const { data: reports, isLoading } = useCollection(reportsQuery);

  return (
    <div className="p-8 space-y-8 max-w-5xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-headline text-3xl font-black uppercase tracking-tight">Report Archive</h1>
          <p className="text-[10px] text-blue-500 font-black uppercase tracking-widest mt-1">Historical Tactical Intelligence</p>
        </div>
      </div>

      <div className="grid gap-4">
        {isLoading ? (
          <div className="py-20 flex flex-col items-center gap-4">
            <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
            <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Accessing Secure Vault...</p>
          </div>
        ) : reports?.length === 0 ? (
          <Card className="p-20 border-dashed border-white/10 flex flex-col items-center justify-center text-center opacity-40">
             <FileText className="w-12 h-12 mb-4" />
             <p className="text-sm font-black uppercase tracking-widest">No reports synthesized yet.</p>
          </Card>
        ) : (
          reports?.map((report) => (
            <Card key={report.id} className="bg-[#0e0e11] border-white/5 p-6 hover:bg-blue-600/5 transition-all group cursor-pointer">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                   <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500">
                      <FileText className="w-5 h-5" />
                   </div>
                   <div>
                      <h4 className="font-bold text-sm uppercase tracking-tight">{report.inputDataSummary}</h4>
                      <div className="flex items-center gap-3 text-[10px] text-muted-foreground font-medium mt-1">
                        <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {new Date(report.createdAt?.toDate?.() || report.createdAt).toLocaleDateString()}</span>
                        <span className="uppercase tracking-widest">Nexus v3.0 Engine</span>
                      </div>
                   </div>
                </div>
                <div className="flex items-center gap-2">
                   <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"><Download className="w-4 h-4" /></Button>
                   <ArrowRight className="w-5 h-5 text-blue-500 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
