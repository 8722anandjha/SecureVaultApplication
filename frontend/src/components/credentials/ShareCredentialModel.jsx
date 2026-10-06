import { useEffect, useState } from "react";
import {
  shareCredential,
  getCredentialShares,
  updateCredentialShare,
  revokeCredentialShare,
} from "../../services/credentialService.js";

const ShareCredentialModal = ({ credential, onClose }) => {
  const [email, setEmail] = useState("");

  const [permission, setPermission] = useState("VIEW_ONLY");

  const [expiresAt, setExpiresAt] = useState("");

  const [shares, setShares] = useState([]);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const loadShares = async () => {
    try {

      const data = await getCredentialShares(credential.id);

      setShares(data);
    } catch (error) {
      setError(error.response?.data?.message || "Failed to load shares");
    }
  };

  useEffect(() => {
    loadShares();
  }, [credential.id]);

  const handleShare = async (e) => {
    e.preventDefault();

    setError("");

    if (!email.trim()) {
      setError("Email is required");
      return;
    }

    setLoading(true);

    try {
      await shareCredential(credential.id, {
        email,
        permission,
        expiresAt: expiresAt || null,
      });

      setEmail("");
      setPermission("VIEW_ONLY");
      setExpiresAt("");

      await loadShares();
    } catch (error) {
    
      setError(error.response?.data?.message || "Failed to share credential");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (shareId, newPermission, currentExpiresAt) => {
    try {
      await updateCredentialShare(credential.id, shareId, {
        permission: newPermission,
        expiresAt: currentExpiresAt ? currentExpiresAt : null,
      });

      await loadShares();
    } catch (error) {
      setError(error.response?.data?.message || "Failed to update share");
    }
  };

  const handleRevoke = async (shareId) => {
    const confirmed = window.confirm(
      "Are you sure you want to revoke this access?",
    );

    if (!confirmed) return;

    try {
      await revokeCredentialShare(credential.id, shareId);

      await loadShares();
    } catch (error) {
      setError(error.response?.data?.message || "Failed to revoke access");
    }
  };

  const formatDate = (date) => {
    if (!date) {
      return "Never";
    }

    return new Date(date).toLocaleString();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl">
        {/* Header */}

        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              Share Credential
            </h2>

            <p className="text-sm text-gray-500">{credential.title}</p>
          </div>

          <button
            onClick={onClose}
            className="text-2xl text-gray-400 hover:text-gray-700"
          >
            ×
          </button>
        </div>

        {error && (
          <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-600">
            {error}
          </div>
        )}

        {/* Share form */}

        <form onSubmit={handleShare} className="mb-8 space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              User Email
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="user@example.com"
              className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Permission
            </label>

            <select
              value={permission}
              onChange={(e) => setPermission(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-2"
            >
              <option value="VIEW_ONLY">View Only</option>

              <option value="EDIT_ACCESS">Edit Access</option>

              <option value="FULL_MANAGEMENT">Full Management</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Expiration
            </label>

            <input
              type="datetime-local"
              value={expiresAt}
              onChange={(e) => setExpiresAt(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-2"
            />

            <p className="mt-1 text-xs text-gray-500">
              Leave empty for permanent access.
            </p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-indigo-600 px-4 py-3 font-semibold text-white hover:bg-indigo-700 disabled:opacity-50"
          >
            {loading ? "Sharing..." : "Share Credential"}
          </button>
        </form>

        {/* Existing shares */}

        <div>
          <h3 className="mb-4 text-lg font-semibold text-gray-900">
            Shared With
          </h3>

          {shares.length === 0 ? (
            <div className="rounded-lg bg-gray-50 p-6 text-center text-sm text-gray-500">
              This credential has not been shared yet.
            </div>
          ) : (
            <div className="space-y-3">
              {shares.map((share) => (
                <div
                  key={share.id}
                  className="rounded-xl border border-gray-200 p-4"
                >
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="font-medium text-gray-900">
                        {share.sharedWithEmail}
                      </p>

                      <p className="text-xs text-gray-500">
                        Expires: {formatDate(share.expiresAt)}
                      </p>
                    </div>

                    <div className="flex gap-2">
                      <select
                        value={share.permission}
                        onChange={(e) =>
                          handleUpdate(
                            share.id,
                            e.target.value,
                            share.expiresAt,
                          )
                        }
                        className="rounded-lg border border-gray-300 px-3 py-2 text-sm"
                      >
                        <option value="VIEW_ONLY">View Only</option>

                        <option value="EDIT_ACCESS">Edit Access</option>

                        <option value="FULL_MANAGEMENT">Full Management</option>
                      </select>

                      <button
                        onClick={() => handleRevoke(share.id)}
                        className="rounded-lg bg-red-50 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-100"
                      >
                        Revoke
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShareCredentialModal;
