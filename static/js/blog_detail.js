/**
 * Blog Detail Page Functionality
 * Handles reading progress, back to top button, sharing widgets, and dynamic comments posting.
 */
document.addEventListener('DOMContentLoaded', () => {
    /* ── Reading Progress Bar ── */
    const progress = document.getElementById('blogDetailReadingProgress');
    if (progress) {
        window.addEventListener('scroll', () => {
            const scrollTop = window.scrollY || document.documentElement.scrollTop;
            const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
            progress.style.width = pct + '%';
        });
    }

    /* ── Back to Top Button ── */
    const backTop = document.getElementById('blogDetailBackTop');
    if (backTop) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 400) {
                backTop.classList.add('show');
            } else {
                backTop.classList.remove('show');
            }
        });

        backTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    /* ── Share Links ── */
    const title = encodeURIComponent(document.title);
    const url = encodeURIComponent(window.location.href);

    document.querySelectorAll('.blog-detail-share-icons a, .blog-detail-share a').forEach(link => {
        const icon = link.querySelector('i');
        if (!icon) return;

        link.setAttribute('target', '_blank');
        link.setAttribute('rel', 'noopener noreferrer');

        if (icon.classList.contains('fa-facebook-f') || icon.classList.contains('fa-facebook')) {
            link.href = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
        } else if (icon.classList.contains('fa-linkedin-in') || icon.classList.contains('fa-linkedin')) {
            link.href = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
        } else if (icon.classList.contains('fa-x-twitter') || icon.classList.contains('fa-twitter')) {
            link.href = `https://twitter.com/intent/tweet?text=${title}&url=${url}`;
        } else if (icon.classList.contains('fa-whatsapp')) {
            link.href = `https://api.whatsapp.com/send?text=${title}%20${url}`;
        }
    });

    /* ── Dynamic Local Comments Posting ── */
    const commentForm = document.getElementById('commentForm');
    const commentsList = document.getElementById('blogCommentsList');
    const commentCountEl = document.getElementById('commentCount');
    const submitBtn = document.getElementById('submitCommentBtn');

    if (commentForm && commentsList) {
        commentForm.addEventListener('submit', function (e) {
            e.preventDefault(); // Prevent standard page reload

            const name = document.getElementById('commentName').value.trim();
            const email = document.getElementById('commentEmail').value.trim();
            const message = document.getElementById('commentMessage').value.trim();

            if (!name || !email || !message) {
                alert('Please fill out all required fields.');
                return;
            }

            // Set loading state on button
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Posting Comment...';
            }

            // Simulate server roundtrip
            setTimeout(() => {
                // Restore submit button
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Post Comment';
                }

                // Create name initials for avatar
                const initials = name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() || 'U';

                // Format current date
                const options = { year: 'numeric', month: 'long', day: 'numeric' };
                const formattedDate = new Date().toLocaleDateString('en-US', options);

                // Create new comment element
                const newComment = document.createElement('div');
                newComment.className = 'blog-comment-item comment-fade-in';
                newComment.innerHTML = `
                    <div class="comment-avatar">${initials}</div>
                    <div class="comment-details">
                        <div class="comment-meta">
                            <h5>${escapeHTML(name)}</h5>
                            <span>${formattedDate}</span>
                        </div>
                        <p>${escapeHTML(message)}</p>
                    </div>
                `;

                // Prepend comment to the list
                commentsList.insertBefore(newComment, commentsList.firstChild);

                // Update comments count count
                if (commentCountEl) {
                    let currentCount = parseInt(commentCountEl.textContent) || 0;
                    commentCountEl.textContent = currentCount + 1;
                }

                // Reset form inputs
                commentForm.reset();

                // Scroll to the new comment smoothly
                newComment.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

            }, 1000);
        });
    }

    // Helper to escape HTML to prevent XSS
    function escapeHTML(str) {
        return str.replace(/[&<>'"]/g, 
            tag => ({
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                "'": '&#39;',
                '"': '&quot;'
            }[tag] || tag)
        );
    }
});
