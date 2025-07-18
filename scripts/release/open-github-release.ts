import githubRelease from 'new-github-release-url';
import open from 'open';

export function openGithubRelease(version: string) {
  open(
    githubRelease({
      user: 'empoleondev',
      repo: 'empoleon',
      tag: version,
      title: version,
    })
  );
}
