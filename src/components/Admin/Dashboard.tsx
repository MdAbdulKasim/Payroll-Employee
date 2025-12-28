"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Users, DollarSign, Calendar, TrendingUp, AlertCircle, CheckCircle } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function DashboardContent() {
    const { employees, payruns, organizationData } = useApp();

    const stats = [
        {
            title: 'Total Employees',
            value: employees.length.toString(),
            icon: Users,
            description: 'Active employees',
            trend: '',
            color: 'text-blue-600',
            bgColor: 'bg-blue-100'
        },
        {
            title: 'Total Payroll',
            value: '₹0',
            icon: DollarSign,
            description: 'This month',
            trend: '',
            color: 'text-green-600',
            bgColor: 'bg-green-100'
        },
        {
            title: 'Pay Runs',
            value: payruns.length.toString(),
            icon: Calendar,
            description: 'Completed this year',
            trend: '',
            color: 'text-purple-600',
            bgColor: 'bg-purple-100'
        },
        {
            title: 'Pending Approvals',
            value: '0',
            icon: AlertCircle,
            description: 'Requires attention',
            trend: '',
            color: 'text-orange-600',
            bgColor: 'bg-orange-100'
        }
    ];

    return (
        <div className="space-y-6 md:space-y-8 p-4 md:p-6">
            <div>
                <h1 className="text-2xl md:text-3xl mb-2 font-semibold">
                    Welcome back{organizationData?.name ? `, ${organizationData.name}` : ''}!
                </h1>
                <p className="text-sm md:text-base text-gray-600">
                    Here's what's happening with your payroll today.
                </p>
            </div>

            {/* Stats Grid */}
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat) => {
                    const Icon = stat.icon;
                    return (
                        <Card key={stat.title} className="overflow-hidden">
                            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                                <div className={`${stat.bgColor} p-2 rounded-lg`}>
                                    <Icon className={`h-4 w-4 ${stat.color}`} />
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="text-xl md:text-2xl font-bold">{stat.value}</div>
                                <p className="text-xs text-gray-600 mt-1">{stat.description}</p>
                                {stat.trend && <p className="text-xs text-gray-500 mt-2">{stat.trend}</p>}
                            </CardContent>
                        </Card>
                    );
                })}
            </div>

            <div className="grid gap-4 md:gap-6 grid-cols-1 lg:grid-cols-2">
                {/* Recent Activity */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg md:text-xl">Recent Activity</CardTitle>
                        <CardDescription className="text-sm">Latest updates and changes</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3 md:space-y-4">
                            <p className="text-sm text-gray-500 text-center py-4">No recent activities</p>
                        </div>
                    </CardContent>
                </Card>

                {/* Upcoming Tasks */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg md:text-xl">Upcoming Tasks</CardTitle>
                        <CardDescription className="text-sm">Tasks that need your attention</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3 md:space-y-4">
                            <p className="text-sm text-gray-500 text-center py-4">No upcoming tasks</p>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Quick Actions */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg md:text-xl">Quick Actions</CardTitle>
                    <CardDescription className="text-sm">Common tasks to get you started</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-3 md:gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
                        <button className="p-4 border border-gray-200 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-colors text-left">
                            <TrendingUp className="h-5 w-5 md:h-6 md:w-6 text-blue-600 mb-2" />
                            <h3 className="text-sm font-medium">Run Payroll</h3>
                            <p className="text-xs text-gray-500 mt-1">Process monthly salary</p>
                        </button>
                        <button className="p-4 border border-gray-200 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-colors text-left">
                            <Users className="h-5 w-5 md:h-6 md:w-6 text-blue-600 mb-2" />
                            <h3 className="text-sm font-medium">Add Employee</h3>
                            <p className="text-xs text-gray-500 mt-1">Onboard new team member</p>
                        </button>
                        <button className="p-4 border border-gray-200 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-colors text-left">
                            <Calendar className="h-5 w-5 md:h-6 md:w-6 text-blue-600 mb-2" />
                            <h3 className="text-sm font-medium">View Reports</h3>
                            <p className="text-xs text-gray-500 mt-1">Generate payroll reports</p>
                        </button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}