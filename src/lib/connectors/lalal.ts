import { flags } from '../config/flags';

const LALAL_API_URL = 'https://www.lalal.ai/api';

export async function splitStems(previewUrl: string) {
  if (!flags.lalalStems || !previewUrl) {
    return null;
  }

  const token = process.env.LALAL_API_KEY || process.env.LALAL_AI_API_KEY;
  if (!token) {
    console.warn('[LALAL.AI] Missing API Key');
    return null;
  }

  try {
    console.log(`[LALAL.AI] Downloading preview from Spotify...`);
    const audioRes = await fetch(previewUrl);
    const audioBlob = await audioRes.blob();

    console.log(`[LALAL.AI] Uploading to LALAL.AI...`);
    const formData = new FormData();
    formData.append('file', audioBlob, 'preview.mp3');

    const uploadRes = await fetch(`${LALAL_API_URL}/upload/`, {
      method: 'POST',
      headers: {
        'Authorization': `license ${token}`
      },
      body: formData
    });

    if (!uploadRes.ok) throw new Error(`Upload failed: ${uploadRes.statusText}`);
    const uploadData = await uploadRes.json();
    const sourceId = uploadData.id || uploadData.source_id;

    if (!sourceId) throw new Error("No source_id returned from LALAL.AI upload");

    console.log(`[LALAL.AI] Splitting stems for source ${sourceId}...`);
    const splitRes = await fetch(`${LALAL_API_URL}/split/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `license ${token}`
      },
      body: JSON.stringify({
        source_id: sourceId,
        stem: 'vocals',
        filter: 1 // 1=Mild, 2=Normal, 3=Aggressive
      })
    });

    if (!splitRes.ok) throw new Error(`Split failed: ${splitRes.statusText}`);
    const splitData = await splitRes.json();
    const taskId = splitData.task_id || splitData.id;

    console.log(`[LALAL.AI] Polling task ${taskId}...`);
    let status = '';
    let result = null;
    let attempts = 0;

    while (status !== 'success' && status !== 'error' && attempts < 20) {
      if (attempts > 0) await new Promise(r => setTimeout(r, 5000));
      attempts++;

      const checkRes = await fetch(`${LALAL_API_URL}/check/?id=${taskId}`, {
        headers: {
          'Authorization': `license ${token}`
        }
      });
      const checkData = await checkRes.json();
      status = checkData.status || checkData.state;
      if (status === 'success' || status === 'done') {
        result = checkData;
        break;
      }
    }

    if (!result) throw new Error("LALAL.AI processing timed out");

    console.log(`[LALAL.AI] Splitting finished!`);
    return {
      vocals: result.stem_track || result.vocal_url,
      instrumental: result.back_track || result.instrumental_url
    };

  } catch (error) {
    console.error('[LALAL.AI] Error:', error);
    return null;
  }
}
