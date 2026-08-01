import React from "react";

import { UserCog, Sparkles } from "lucide-react";
import { UpdateProfileForm } from "../_components/update_data/UpdateProfileData";

const UpdateProfilePage = async () => {
  return (
    <main className="min-h-[85vh] bg-slate-50/50 dark:bg-zinc-950/50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto space-y-6">
        
        {/* Header Section */}
        <div className="text-center space-y-2">
          
          <h1 className="text-3xl font-black tracking-tight text-zinc-900 dark:text-white">
            Update <span className="text-primary">Profile</span>
          </h1>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Manage and update your personal information and profile settings.
          </p>
        </div>

        {/* Card Container holding Client Form Component */}
        <div className="bg-white dark:bg-zinc-900/80 p-6 sm:p-8 rounded-2xl border border-zinc-200/80 dark:border-zinc-800 shadow-sm backdrop-blur-xl">
          <UpdateProfileForm />
        </div>

      </div>
    </main>
  );
};

export default UpdateProfilePage;