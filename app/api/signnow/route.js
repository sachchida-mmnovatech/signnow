export async function POST() {
    const ACCESS_TOKEN = 'd72d198f9b76202f179528dfa9229ec3a640fefda6b6d51cefb53f011a281d8d';
    const DOCUMENT_ID = 'b852eecc1afb46c599034ae4674fd48cd2954eea';
  
    try {
      const inviteRes = await fetch(`https://api.signnow.com/v2/documents/${DOCUMENT_ID}/embedded-invites`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "name_formula": "Sign",
          "invites": [
              {
                  "email": "s.n.sharma0307@gmail.com",
                  "role_id": "8613affe5f3943e7891196488d13c5d76f5b454c",
                  "order": 1,
                  "auth_method": "none",
                  "first_name": "Sachchida",
                  "last_name": "Sharma",
                  "redirect_uri": "https://example.com",
                  "decline_redirect_uri": "https://signnow.com",
                  "close_redirect_uri": "https://close-redirect-uri.com",
                  "redirect_target": "blank"
              }
          ]
        }),
      });

      console.log(inviteRes)
  
      const invite = await inviteRes.json();

      console.log(invite)
  
      const linkRes = await fetch(`https://api.signnow.com/v2/documents/${DOCUMENT_ID}/embedded-invites/${invite?.data[0].id}/link`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({"auth_method": "none",
            "link_expiration": 30,
            "session_expiration": 60}),
      });

      console.log(linkRes)
  
      const linkData = await linkRes.json();
  
      return Response.json({ signingLink: linkData?.data?.link });
    } catch (err) {
      console.error('SignNow error:', err);
      return Response.json({ error: 'Failed to generate signing link' }, { status: 500 });
    }
  }
  