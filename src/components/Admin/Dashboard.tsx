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
            trend: '+12% from last month',
            color: 'text-blue-600',
            bgColor: 'bg-blue-100'
        },
        {
            title: 'Total Payroll',
            value: '₹0',
            icon: DollarSign,
            description: 'This month',
            trend: '0% change',
            color: 'text-green-600',
            bgColor: 'bg-green-100'
        },
        {
            title: 'Pay Runs',
            value: payruns.length.toString(),
            icon: Calendar,
            description: 'Completed this year',
            trend: `${payruns.length} total`,
            color: 'text-purple-600',
            bgColor: 'bg-purple-100'
        },
        {
            title: 'Pending Approvals',
            value: '0',
            icon: AlertCircle,
            description: 'Requires attention',
            trend: 'All clear',
            color: 'text-orange-600',
            bgColor: 'bg-orange-100'
        }
    ];

    const recentActivities = [
        { id: 1, action: 'Setup completed', time: 'Just now', status: 'success' },
        { id: 2, action: 'Organization details updated', time: '5 minutes ago', status: 'success' },
    ];

    const upcomingTasks = [
        { id: 1, task: 'Run monthly payroll', dueDate: 'Dec 30, 2025', priority: 'high' },
        { id: 2, task: 'Review reimbursements', dueDate: 'Dec 20, 2025', priority: 'medium' },
        { id: 3, task: 'Update tax settings', dueDate: 'Dec 25, 2025', priority: 'low' },
    ];

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl mb-2">
                    Welcome back{organizationData?.name ? `, ${organizationData.name}` : ''}!
                </h1>
                <p className="text-gray-600">
                    Here's what's happening with your payroll today.
                </p>
            </div>

            {/* Stats Grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat) => {
                    const Icon = stat.icon;
                    return (
                        <Card key={stat.title}>
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <CardTitle className="text-sm">{stat.title}</CardTitle>
                                <div className={`${stat.bgColor} p-2 rounded-lg`}>
                                    <Icon className={`h-4 w-4 ${stat.color}`} />
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl">{stat.value}</div>
                                <p className="text-xs text-gray-600 mt-1">{stat.description}</p>
                                <p className="text-xs text-gray-500 mt-2">{stat.trend}</p>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
                {/* Recent Activity */}
                <Card>
                    <CardHeader>
                        <CardTitle>Recent Activity</CardTitle>
                        <CardDescription>Latest updates and changes</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {recentActivities.map((activity) => (
                                <div key={activity.id} className="flex items-center gap-4">
                                    <div className={`p-2 rounded-full ${activity.status === 'success' ? 'bg-green-100' : 'bg-gray-100'}`}>
                                        <CheckCircle className={`h-4 w-4 ${activity.status === 'success' ? 'text-green-600' : 'text-gray-600'}`} />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm">{activity.action}</p>
                                        <p className="text-xs text-gray-500">{activity.time}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Upcoming Tasks */}
                <Card>
                    <CardHeader>
                        <CardTitle>Upcoming Tasks</CardTitle>
                        <CardDescription>Tasks that need your attention</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {upcomingTasks.map((task) => (
                                <div key={task.id} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                                    <div className="flex-1">
                                        <p className="text-sm">{task.task}</p>
                                        <p className="text-xs text-gray-500">Due: {task.dueDate}</p>
                                    </div>
                                    <span className={`text-xs px-2 py-1 rounded ${task.priority === 'high' ? 'bg-red-100 text-red-700' :
                                            task.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                                                'bg-green-100 text-green-700'
                                        }`}>
                                        {task.priority}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Quick Actions */}
            <Card>
                <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                    <CardDescription>Common tasks to get you started</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-4 md:grid-cols-3">
                        <button className="p-4 border border-gray-200 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-colors text-left">
                            <TrendingUp className="h-6 w-6 text-blue-600 mb-2" />
                            <h3 className="text-sm">Run Payroll</h3>
                            <p className="text-xs text-gray-500">Process monthly salary</p>
                        </button>
                        <button className="p-4 border border-gray-200 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-colors text-left">
                            <Users className="h-6 w-6 text-blue-600 mb-2" />
                            <h3 className="text-sm">Add Employee</h3>
                            <p className="text-xs text-gray-500">Onboard new team member</p>
                        </button>
                        <button className="p-4 border border-gray-200 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-colors text-left">
                            <Calendar className="h-6 w-6 text-blue-600 mb-2" />
                            <h3 className="text-sm">View Reports</h3>
                            <p className="text-xs text-gray-500">Generate payroll reports</p>
                        </button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
