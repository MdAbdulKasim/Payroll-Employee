"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Lock, Eye, EyeOff, CheckCircle, CheckCircle2, Loader2 } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function ResetPassword() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check if OTP was verified
    const otpVerified = sessionStorage.getItem("otpVerified");
    const resetEmail = sessionStorage.getItem("resetEmail");

    if (!otpVerified || !resetEmail) {
      // If OTP not verified, redirect to forgot password
      router.push("/login/forgotpassword");
    }
  }, [router]);

  const validatePassword = () => {
    if (newPassword.length < 6) {
      alert("Password must be at least 6 characters long");
      return false;
    }
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match");
      return false;
    }
    return true;
  };

  const handleResetPassword = async () => {
    if (!validatePassword()) return;

    setIsLoading(true);

    const email = sessionStorage.getItem("resetEmail");
    const resetToken = sessionStorage.getItem("resetToken");

    try {
      const response = await axios.post("http://localhost:4000/api/payroll/auth/reset-password", {
        email: email,
        resetToken: resetToken,
        newPassword: newPassword,
      });

      if (response.status === 200 || response.status === 201) {
        toast.success("Password reset successfully!");

        // Clear session storage
        sessionStorage.removeItem("resetEmail");
        sessionStorage.removeItem("otpVerified");
        sessionStorage.removeItem("resetToken");

        // Show success dialog
        setShowSuccessDialog(true);
      }
    } catch (error: any) {
      console.error("Reset password error:", error);
      const errorMessage = error.response?.data?.message || "Failed to reset password. Please try again.";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDialogClose = () => {
    setShowSuccessDialog(false);
    router.push("/login");
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Card */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lock className="w-8 h-8 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Reset Password
              </h2>
              <p className="text-gray-600 text-sm">
                Create a new strong password for your account
              </p>
            </div>

            {/* New Password */}
            <div className="mb-5">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                New Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showNewPassword ? "text" : "password"}
                  placeholder="Enter new password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full h-11 pl-10 pr-10 rounded-md border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showNewPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Must be at least 6 characters
              </p>
            </div>

            {/* Confirm Password */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleResetPassword()}
                  className="w-full h-11 pl-10 pr-10 rounded-md border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Password Match Indicator */}
            {confirmPassword && (
              <div className="mb-6">
                {newPassword === confirmPassword ? (
                  <div className="flex items-center gap-2 text-green-600 text-sm">
                    <CheckCircle className="w-4 h-4" />
                    <span>Passwords match</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-red-600 text-sm">
                    <span>Passwords do not match</span>
                  </div>
                )}
              </div>
            )}

            {/* Reset Password Button */}
            <button
              onClick={handleResetPassword}
              disabled={isLoading}
              className="w-full h-11 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition-colors disabled:bg-blue-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Resetting...</span>
                </>
              ) : (
                "Reset Password"
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Success Dialog */}
      <Dialog open={showSuccessDialog} onOpenChange={handleDialogClose}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="mx-auto w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <CheckCircle2 className="w-6 h-6 text-blue-600" />
            </div>
            <DialogTitle className="text-center text-xl">
              Password Reset Successful!
            </DialogTitle>
            <DialogDescription className="text-center pt-2">
              Your password has been successfully reset. You can now login with your new password.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-center mt-4">
            <button
              onClick={handleDialogClose}
              className="px-6 py-2 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition-colors"
            >
              Go to Login
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}