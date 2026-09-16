import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/redux/store';
import {
  BlueprintPayload,
  BlueprintState,
  Theme,
  ThemeContext,
} from './blueprintType';
import {
  fetchBlueprintThunk,
  updateBlueprintThunk,
  updateThemeThunk,
  updateBrandValueThunk,
  updateBusinessProfileThunk,
  updateNavigationThunk,
} from './blueprintThunk';
import globalThemeConfig from '@/styles/global.json';

const fallbackThemeSource =
  (globalThemeConfig as any).public_theme ??
  (globalThemeConfig as any).admin_theme;

const fallbackTheme = {
  ...fallbackThemeSource,
  typography: {
    ...(fallbackThemeSource.typography as any),
    monoFont: fallbackThemeSource.typography?.monoFont ?? 'JetBrains Mono',
  },
} as Theme;

function themeFromKalpTheme(kalpTheme: any): Theme | null {
  if (!kalpTheme) return null;

  const tokenColor = kalpTheme.tokens?.color ?? {};
  const colors = kalpTheme.colors ?? {};
  const font = kalpTheme.tokens?.font ?? {};
  const typography = kalpTheme.typography ?? {};

  return {
    ...fallbackTheme,
    colors: {
      ...fallbackTheme.colors,
      primary: tokenColor.primary ?? colors.primary ?? fallbackTheme.colors.primary,
      secondary: tokenColor.secondary ?? colors.secondary ?? fallbackTheme.colors.secondary,
      accent: tokenColor.accent ?? colors.accent ?? fallbackTheme.colors.accent,
      background: tokenColor.background ?? colors.background ?? fallbackTheme.colors.background,
      surface: tokenColor.surface ?? colors.surface ?? fallbackTheme.colors.surface,
      text: tokenColor.text ?? colors.text ?? fallbackTheme.colors.text,
      textMuted: tokenColor.muted ?? fallbackTheme.colors.textMuted,
      success: tokenColor.success ?? fallbackTheme.colors.success,
      warning: tokenColor.warning ?? fallbackTheme.colors.warning,
      danger: tokenColor.danger ?? fallbackTheme.colors.danger,
    },
    typography: {
      ...fallbackTheme.typography,
      bodyFont: typography.bodyFont ?? font.body ?? fallbackTheme.typography.bodyFont,
      headingFont: typography.headingFont ?? font.heading ?? fallbackTheme.typography.headingFont,
    },
  };
}

function normalizeBlueprintPayload(data: any): BlueprintPayload | null {
  const source = data?.payload ?? data;
  if (!source) return null;

  const publicTheme =
    source.public_theme ??
    source.brandAssets?.public_theme ??
    themeFromKalpTheme(source.experience?.public?.theme) ??
    fallbackTheme;

  const adminTheme =
    source.admin_theme ??
    source.brandAssets?.admin_theme ??
    themeFromKalpTheme(source.experience?.admin?.theme) ??
    publicTheme;

  return {
    ...source,
    public_theme: publicTheme,
    admin_theme: adminTheme,
    brandAssets: {
      ...(source.brandAssets ?? {}),
      public_theme: publicTheme,
      admin_theme: adminTheme,
    },
  } as BlueprintPayload;
}

// ============================================================
// INITIAL STATE
// ============================================================

const initialState: BlueprintState = {
  payload: null,
  activeThemeContext: 'public',
  loading: false,
  updating: false,
  error: null,
  lastFetched: null,
};

// ============================================================
// SLICE
// ============================================================

const blueprintSlice = createSlice({
  name: 'blueprint',
  initialState,
  reducers: {
  
    setThemeContext: (state, action: PayloadAction<ThemeContext>) => {
      state.activeThemeContext = action.payload;
    },

    applyColorOverride: (
      state,
      action: PayloadAction<{ context: ThemeContext; colors: Partial<Theme['colors']> }>
    ) => {
      const { context, colors } = action.payload;
      if (!state.payload) return;
      const key = context === 'admin' ? 'admin_theme' : 'public_theme';
      state.payload[key].colors = {
        ...state.payload[key].colors,
        ...colors,
      };
      // Keep brandAssets in sync
      if (state.payload.brandAssets?.[key]) {
        state.payload.brandAssets[key].colors = {
          ...state.payload.brandAssets[key].colors,
          ...colors,
        };
      }
    },

    clearBlueprintError: (state) => {
      state.error = null;
    },
    resetBlueprint: () => initialState,
  },

  extraReducers: (builder) => {
    // ---- FETCH ------------------------------------------------
    builder
      .addCase(fetchBlueprintThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBlueprintThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.payload = normalizeBlueprintPayload(action.payload);
        state.lastFetched = new Date().toISOString();
        state.error = null;
      })
      .addCase(fetchBlueprintThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? 'Failed to load blueprint';
      });

    // ---- FULL UPDATE -----------------------------------------
    builder
      .addCase(updateBlueprintThunk.pending, (state) => {
        state.updating = true;
        state.error = null;
      })
      .addCase(updateBlueprintThunk.fulfilled, (state, action) => {
        state.updating = false;
        state.payload = normalizeBlueprintPayload(action.payload);
        state.lastFetched = new Date().toISOString();
      })
      .addCase(updateBlueprintThunk.rejected, (state, action) => {
        state.updating = false;
        state.error = action.payload ?? 'Failed to update blueprint';
      });

    // ---- UPDATE THEME ----------------------------------------
    builder
      .addCase(updateThemeThunk.pending, (state) => {
        state.updating = true;
        state.error = null;
      })
      .addCase(updateThemeThunk.fulfilled, (state, action) => {
        state.updating = false;
        if (!state.payload) return;
        const { context, theme } = action.payload;
        const key = context === 'admin' ? 'admin_theme' : 'public_theme';
        state.payload[key] = theme;
        if (state.payload.brandAssets?.[key]) {
          state.payload.brandAssets[key] = theme;
        }
      })
      .addCase(updateThemeThunk.rejected, (state, action) => {
        state.updating = false;
        state.error = action.payload ?? 'Failed to update theme';
      });

    // ---- UPDATE BRAND VALUE ----------------------------------
    builder
      .addCase(updateBrandValueThunk.pending, (state) => {
        state.updating = true;
      })
      .addCase(updateBrandValueThunk.fulfilled, (state, action) => {
        state.updating = false;
        if (state.payload) {
          state.payload.brandValue = action.payload.brandValue;
        }
      })
      .addCase(updateBrandValueThunk.rejected, (state, action) => {
        state.updating = false;
        state.error = action.payload ?? 'Failed to update brand value';
      });

    // ---- UPDATE BUSINESS PROFILE ----------------------------
    builder
      .addCase(updateBusinessProfileThunk.pending, (state) => {
        state.updating = true;
      })
      .addCase(updateBusinessProfileThunk.fulfilled, (state, action) => {
        state.updating = false;
        if (state.payload) {
          state.payload.businessProfile = action.payload.businessProfile;
        }
      })
      .addCase(updateBusinessProfileThunk.rejected, (state, action) => {
        state.updating = false;
        state.error = action.payload ?? 'Failed to update business profile';
      });

    // ---- UPDATE NAVIGATION ----------------------------------
    builder
      .addCase(updateNavigationThunk.pending, (state) => {
        state.updating = true;
      })
      .addCase(updateNavigationThunk.fulfilled, (state, action) => {
        state.updating = false;
        if (!state.payload) return;
        const { context, navigation } = action.payload;
        if (context === 'admin') {
          state.payload.admin_navigation = navigation;
        } else {
          state.payload.public_navigation = navigation;
        }
      })
      .addCase(updateNavigationThunk.rejected, (state, action) => {
        state.updating = false;
        state.error = action.payload ?? 'Failed to update navigation';
      });
  },
});

// ============================================================
// ACTIONS
// ============================================================

export const {
  setThemeContext,
  applyColorOverride,
  clearBlueprintError,
  resetBlueprint,
} = blueprintSlice.actions;

export default blueprintSlice.reducer;

// ============================================================
// SELECTORS
// ============================================================

/** The full blueprint payload */
export const selectBlueprint = (state: RootState): BlueprintPayload | null =>
  state.blueprint.payload;

/** Currently active theme context ('public' | 'admin') */
export const selectThemeContext = (state: RootState): ThemeContext =>
  state.blueprint.activeThemeContext;

/** Public theme (for the frontend website) */
export const selectPublicTheme = (state: RootState): Theme | null =>
  state.blueprint.payload?.public_theme ?? null;

/** Admin theme (for the dashboard) */
export const selectAdminTheme = (state: RootState): Theme | null =>
  state.blueprint.payload?.admin_theme ?? null;

/** Active theme based on context — use this in the CSS injector */
export const selectActiveTheme = (state: RootState): Theme | null => {
  const ctx = state.blueprint.activeThemeContext;
  return ctx === 'admin'
    ? state.blueprint.payload?.admin_theme ?? null
    : state.blueprint.payload?.public_theme ?? null;
};

/** Brand Assets public theme — source of truth for dynamic CSS vars */
export const selectBrandAssetsPublicTheme = (state: RootState): Theme | null =>
  state.blueprint.payload?.brandAssets?.public_theme ?? null;

/** Brand value — taglines, social links */
export const selectBrandValue = (state: RootState) =>
  state.blueprint.payload?.brandValue ?? null;

/** Business profile — contact info, business info */
export const selectBusinessProfile = (state: RootState) =>
  state.blueprint.payload?.businessProfile ?? null;

/** Public navigation items */
export const selectPublicNavigation = (state: RootState) =>
  state.blueprint.payload?.public_navigation ?? [];

/** Admin navigation items */
export const selectAdminNavigation = (state: RootState) =>
  state.blueprint.payload?.admin_navigation ?? [];

/** Routes definition */
export const selectRoutes = (state: RootState) =>
  state.blueprint.payload?.routes ?? [];

/** Enabled module slugs for feature-flagging */
export const selectEnabledModules = (state: RootState) =>
  state.blueprint.payload?.enabled_modules ?? [];

/** Vocabulary (customer, order, etc.) */
export const selectVocabulary = (state: RootState) =>
  state.blueprint.payload?.vocabulary ?? null;

/** Localization config */
export const selectLocalization = (state: RootState) =>
  state.blueprint.payload?.localization ?? null;

/** Commerce config */
export const selectCommerce = (state: RootState) =>
  state.blueprint.payload?.commerce ?? null;

/** Dashboard widgets */
export const selectDashboardWidgets = (state: RootState) =>
  state.blueprint.payload?.dashboard_widgets ?? [];

/** Templates list */
export const selectTemplates = (state: RootState) =>
  state.blueprint.payload?.templates ?? [];

/** Tone tags */
export const selectToneTags = (state: RootState) =>
  state.blueprint.payload?.toneTags ?? [];

/** Media configuration */
export const selectMediaConfiguration = (state: RootState) =>
  state.blueprint.payload?.mediaConfiguration ?? null;

/** Loading state */
export const selectBlueprintLoading = (state: RootState) =>
  state.blueprint.loading;

/** Updating state */
export const selectBlueprintUpdating = (state: RootState) =>
  state.blueprint.updating;

/** Error state */
export const selectBlueprintError = (state: RootState) =>
  state.blueprint.error;

/** Last fetched timestamp */
export const selectBlueprintLastFetched = (state: RootState) =>
  state.blueprint.lastFetched;
