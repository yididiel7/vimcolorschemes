import { describe, it, expect } from 'vitest';

import Backgrounds from '@/lib/backgrounds';
import Editors from '@/lib/editors';
import PageContext from '@/lib/pageContext';
import { SortOptions } from '@/lib/sort';

import PageContextHelper from '@/helpers/pageContext';

describe('PageContextHelper.get', () => {
  it('should capture the sort option', () => {
    expect(PageContextHelper.get([SortOptions.Trending])).toEqual<PageContext>({
      sort: SortOptions.Trending,
      filter: {},
    });
  });

  it('should capture the editor filter', () => {
    expect(
      PageContextHelper.get([SortOptions.Trending, 'e.vim']),
    ).toEqual<PageContext>({
      sort: SortOptions.Trending,
      filter: { editor: Editors.Vim },
    });
  });

  it('should capture the background filter', () => {
    expect(
      PageContextHelper.get([SortOptions.Trending, 'b.light']),
    ).toEqual<PageContext>({
      sort: SortOptions.Trending,
      filter: { background: Backgrounds.Light },
    });
  });

  it('should capture the search filter', () => {
    expect(
      PageContextHelper.get([SortOptions.Trending, 's.test']),
    ).toEqual<PageContext>({
      sort: SortOptions.Trending,
      filter: { search: 'test' },
    });
  });

  it('should capture the page filter', () => {
    expect(
      PageContextHelper.get([SortOptions.Trending, 'p.3']),
    ).toEqual<PageContext>({
      sort: SortOptions.Trending,
      filter: { page: 3 },
    });
  });

  it('should ignore the page filter if it is 1', () => {
    expect(
      PageContextHelper.get([SortOptions.Trending, 'p.1']),
    ).toEqual<PageContext>({
      sort: SortOptions.Trending,
      filter: {},
    });
  });

  it('should capture multiple filters', () => {
    expect(
      PageContextHelper.get([SortOptions.Old, 'e.vim', 'b.light', 'p.2']),
    ).toEqual<PageContext>({
      sort: SortOptions.Old,
      filter: { editor: Editors.Vim, background: Backgrounds.Light, page: 2 },
    });
  });
});

describe('PageContextHelper.getPageTitle', () => {
  it('should return just the sort indicator if there are no filters', () => {
    expect(
      PageContextHelper.getPageTitle({
        sort: SortOptions.Trending,
        filter: {},
      }),
    ).toBe('trending colorschemes');
  });

  it('should return the background filter if it is defined', () => {
    expect(
      PageContextHelper.getPageTitle({
        sort: SortOptions.Trending,
        filter: { background: Backgrounds.Dark },
      }),
    ).toBe('trending dark colorschemes');
  });

  it('should return the editor filter if it is defined', () => {
    expect(
      PageContextHelper.getPageTitle({
        sort: SortOptions.Trending,
        filter: { editor: Editors.Neovim },
      }),
    ).toBe('trending neovim colorschemes');
  });

  it('should only return the background and editor filter if they are defined', () => {
    expect(
      PageContextHelper.getPageTitle({
        sort: SortOptions.Trending,
        filter: {
          background: Backgrounds.Light,
          editor: Editors.Neovim,
          search: 'test',
          page: 2,
        },
      }),
    ).toBe('trending light neovim colorschemes');
  });
});
