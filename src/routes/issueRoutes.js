const express = require("express");
const router = express.Router();
const multer = require("multer");
const { protect, authorize } = require("../middleware/auth");
const {
    createIssue,
    getIssues,
    getIssue,
    updateIssueStatus,
    assignIssue,
    addComment,
} = require("../controllers/issueController");

// Configure multer for file uploads
const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024, // 5MB limit
    },
});

// Public routes
router.post("/", upload.array("attachments", 5), createIssue);

// Protected routes (admin only)
router.use(protect);
router.use(authorize("admin"));

router.get("/", getIssues);
router.get("/:id", getIssue);
router.patch("/:id/status", updateIssueStatus);
router.patch("/:id/assign", assignIssue);
router.post("/:id/comments", addComment);

module.exports = router; 