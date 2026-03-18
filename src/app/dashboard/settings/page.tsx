
"use client"

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Settings, User, Bell, Shield, Palette } from 'lucide-react';

export default function SettingsPage() {
  return (
    <div className="max-w-4xl mx-auto py-6">
      <div className="flex items-center gap-4 mb-10">
        <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
          <Settings className="w-6 h-6 text-muted-foreground" />
        </div>
        <div>
          <h1 className="font-headline text-3xl font-black tracking-tight">System Settings</h1>
          <p className="text-muted-foreground font-medium">Manage your LuxAI preferences and account security.</p>
        </div>
      </div>

      <Tabs defaultValue="profile" className="space-y-8">
        <TabsList className="bg-white/5 border border-white/5 p-1 rounded-xl">
          <TabsTrigger value="profile" className="rounded-lg data-[state=active]:bg-primary">Profile</TabsTrigger>
          <TabsTrigger value="notifications" className="rounded-lg data-[state=active]:bg-primary">Notifications</TabsTrigger>
          <TabsTrigger value="security" className="rounded-lg data-[state=active]:bg-primary">Security</TabsTrigger>
          <TabsTrigger value="appearance" className="rounded-lg data-[state=active]:bg-primary">Appearance</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6">
          <Card className="border-white/5 bg-card/40">
            <CardHeader>
              <CardTitle className="font-headline flex items-center gap-2"><User className="w-5 h-5" /> Identity Information</CardTitle>
              <CardDescription>Update your public profile and contact details.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Full Name</Label>
                  <Input defaultValue="Jane Doe" className="bg-background border-white/5" />
                </div>
                <div className="space-y-2">
                  <Label>Public Handle</Label>
                  <Input defaultValue="@janedoe" className="bg-background border-white/5" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Bio / Purpose</Label>
                <Input defaultValue="Exploring financial AI and soundscapes." className="bg-background border-white/5" />
              </div>
              <Button className="bg-primary hover:bg-primary/90 font-bold">Save Changes</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card className="border-white/5 bg-card/40">
            <CardHeader>
              <CardTitle className="font-headline flex items-center gap-2"><Bell className="w-5 h-5" /> Delivery Channels</CardTitle>
              <CardDescription>Choose how you receive platform updates and AI reports.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {[
                { label: "Email Reports", desc: "Weekly SmartFolio summaries delivered to inbox." },
                { label: "Push Notifications", desc: "Real-time news alerts from the Intelligence Feed." },
                { label: "Agent Summaries", desc: "Daily chat transcripts from your active personas." }
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between p-4 border border-white/5 rounded-xl bg-background/20">
                  <div>
                    <p className="font-bold text-sm">{item.label}</p>
                    <p className="text-xs text-muted-foreground font-medium">{item.desc}</p>
                  </div>
                  <Switch defaultChecked={i === 0} />
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="security">
           <Card className="border-white/5 bg-card/40">
            <CardHeader>
              <CardTitle className="font-headline flex items-center gap-2"><Shield className="w-5 h-5" /> Access & Encryption</CardTitle>
              <CardDescription>Manage password and authentication methods.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <Button variant="outline" className="border-white/10 w-full justify-start h-12">Change Password</Button>
              <Button variant="outline" className="border-white/10 w-full justify-start h-12">Enable Two-Factor (2FA)</Button>
              <Button variant="outline" className="border-white/10 w-full justify-start h-12 text-destructive hover:bg-destructive/10">Delete Account Data</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appearance">
          <Card className="border-white/5 bg-card/40">
            <CardHeader>
              <CardTitle className="font-headline flex items-center gap-2"><Palette className="w-5 h-5" /> Visualization</CardTitle>
              <CardDescription>Adjust the interface and glow effects.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
               <div className="flex items-center justify-between p-4 border border-white/5 rounded-xl bg-background/20">
                  <div>
                    <p className="font-bold text-sm">Neon Glow Effects</p>
                    <p className="text-xs text-muted-foreground font-medium">Render futuristic glows around primary components.</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between p-4 border border-white/5 rounded-xl bg-background/20">
                  <div>
                    <p className="font-bold text-sm">OLED Optimized Backgrounds</p>
                    <p className="text-xs text-muted-foreground font-medium">Deepen black levels for high-contrast displays.</p>
                  </div>
                  <Switch defaultChecked />
                </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
