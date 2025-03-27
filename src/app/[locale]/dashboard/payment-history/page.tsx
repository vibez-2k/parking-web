"use client"

import { useState } from "react"
import { format } from "date-fns"
import { ArrowDownUp, Calendar, Check, CreditCard, Download, Filter, Search, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { cn } from "@/lib/utils"

// Mock data for transaction history
const transactionHistory = [
  {
    id: "T78901",
    date: new Date("2025-03-25T14:45:00"),
    amount: "$12.50",
    paymentMethod: "Credit Card",
    cardLast4: "4242",
    status: "successful",
    description: "Downtown Parking Garage",
    reference: "P12345",
  },
  {
    id: "T78902",
    date: new Date("2025-03-23T12:30:00"),
    amount: "$5.25",
    paymentMethod: "Credit Card",
    cardLast4: "4242",
    status: "successful",
    description: "City Center Mall",
    reference: "P12346",
  },
  {
    id: "T78903",
    date: new Date("2025-03-22T19:45:00"),
    amount: "$65.00",
    paymentMethod: "PayPal",
    cardLast4: null,
    status: "successful",
    description: "Airport Long-Term Parking",
    reference: "P12347",
  },
  {
    id: "T78904",
    date: new Date("2025-03-18T17:45:00"),
    amount: "$9.75",
    paymentMethod: "Apple Pay",
    cardLast4: null,
    status: "successful",
    description: "Central Park Underground",
    reference: "P12349",
  },
  {
    id: "T78905",
    date: new Date("2025-03-15T16:20:00"),
    amount: "$7.50",
    paymentMethod: "Credit Card",
    cardLast4: "7890",
    status: "failed",
    description: "Westside Shopping Center",
    reference: "P12350",
  },
  {
    id: "T78906",
    date: new Date("2025-03-10T11:15:00"),
    amount: "$3.25",
    paymentMethod: "Credit Card",
    cardLast4: "4242",
    status: "successful",
    description: "Library Parking Lot",
    reference: "P12351",
  },
  {
    id: "T78907",
    date: new Date("2025-03-05T09:30:00"),
    amount: "$15.75",
    paymentMethod: "Google Pay",
    cardLast4: null,
    status: "successful",
    description: "Medical Center Garage",
    reference: "P12352",
  },
]

export default function TransactionHistoryPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [paymentMethodFilter, setPaymentMethodFilter] = useState("all")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")

  // Filter and sort transaction history
  const filteredTransactions = transactionHistory
    .filter((transaction) => {
      // Search filter
      const matchesSearch =
        searchQuery === "" ||
        transaction.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        transaction.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        transaction.reference.toLowerCase().includes(searchQuery.toLowerCase())

      // Status filter
      const matchesStatus = statusFilter === "all" || transaction.status === statusFilter

      // Payment method filter
      const matchesPaymentMethod =
        paymentMethodFilter === "all" ||
        transaction.paymentMethod.toLowerCase().replace(" ", "") === paymentMethodFilter

      return matchesSearch && matchesStatus && matchesPaymentMethod
    })
    .sort((a, b) => {
      // Sort by date
      return sortDirection === "desc" ? b.date.getTime() - a.date.getTime() : a.date.getTime() - b.date.getTime()
    })

  // Calculate total amount
  const totalAmount = filteredTransactions
    .filter((t) => t.status === "successful")
    .reduce((sum, transaction) => {
      const amount = Number.parseFloat(transaction.amount.replace("$", ""))
      return sum + amount
    }, 0)

  return (
    <div className="container mx-auto max-w-6xl">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold tracking-tight">Transaction History</h1>
          <p className="text-muted-foreground">View and manage your payment transactions</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${totalAmount.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">From {filteredTransactions.length} transactions</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Last Transaction</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {filteredTransactions.length > 0 ? format(filteredTransactions[0].date, "MMM d, yyyy") : "N/A"}
              </div>
              <p className="text-xs text-muted-foreground">
                {filteredTransactions.length > 0 ? filteredTransactions[0].description : "No transactions"}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Most Used Payment</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Credit Card</div>
              <p className="text-xs text-muted-foreground">Used for 4 transactions</p>
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search by description, ID, or reference..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2 flex-wrap sm:flex-nowrap">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[130px]">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="successful">Successful</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                </SelectContent>
              </Select>
              <Select value={paymentMethodFilter} onValueChange={setPaymentMethodFilter}>
                <SelectTrigger className="w-[160px]">
                  <CreditCard className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Payment Method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Methods</SelectItem>
                  <SelectItem value="creditcard">Credit Card</SelectItem>
                  <SelectItem value="paypal">PayPal</SelectItem>
                  <SelectItem value="applepay">Apple Pay</SelectItem>
                  <SelectItem value="googlepay">Google Pay</SelectItem>
                </SelectContent>
              </Select>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setSortDirection(sortDirection === "desc" ? "asc" : "desc")}
                className="h-10 w-10"
              >
                <ArrowDownUp className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <Card>
            <CardContent className="p-0">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Reference</TableHead>
                      <TableHead>Payment Method</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredTransactions.length > 0 ? (
                      filteredTransactions.map((transaction) => (
                        <TableRow key={transaction.id}>
                          <TableCell className="font-medium">
                            {format(transaction.date, "MMM d, yyyy")}
                            <div className="text-xs text-muted-foreground">{format(transaction.date, "h:mm a")}</div>
                          </TableCell>
                          <TableCell>{transaction.description}</TableCell>
                          <TableCell>{transaction.reference}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <CreditCard className="h-4 w-4 text-muted-foreground" />
                              <span>{transaction.paymentMethod}</span>
                              {transaction.cardLast4 && (
                                <span className="text-xs text-muted-foreground">•••• {transaction.cardLast4}</span>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>{transaction.amount}</TableCell>
                          <TableCell>
                            <Badge
                              variant={transaction.status === "successful" ? "outline" : "destructive"}
                              className={cn(
                                "capitalize",
                                transaction.status === "successful" &&
                                  "border-green-500 text-green-600 bg-green-50 hover:bg-green-100 dark:bg-green-900/20 dark:text-green-400 dark:hover:bg-green-900/30",
                              )}
                            >
                              {transaction.status === "successful" ? (
                                <Check className="mr-1 h-3 w-3" />
                              ) : (
                                <X className="mr-1 h-3 w-3" />
                              )}
                              {transaction.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="icon">
                              <Download className="h-4 w-4" />
                              <span className="sr-only">Download receipt</span>
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={7} className="h-24 text-center">
                          <div className="flex flex-col items-center justify-center">
                            <CreditCard className="h-8 w-8 text-muted-foreground opacity-50" />
                            <h3 className="mt-2 text-sm font-medium">No transactions found</h3>
                            <p className="mt-1 text-xs text-muted-foreground">
                              Try adjusting your search or filter criteria
                            </p>
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

